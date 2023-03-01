import { HttpService } from '@nestjs/axios'
import { HttpException, Injectable, NotFoundException } from '@nestjs/common'
import { KisHelper } from './kis.helper'

@Injectable()
export class KisService {
  private readonly kisAppKey = process.env.KIS_APP_KEY
  private readonly kisAppSecret = process.env.KIS_APP_SECRET

  constructor(
    private readonly httpService: HttpService,
    private readonly kisHelper: KisHelper,
  ) {
    this.httpService.axiosRef.defaults.baseURL = process.env.KIS_URL
    this.setHeader('appkey', this.kisAppKey)
    this.setHeader('appsecret', this.kisAppSecret)
  }

  async getDomesticCurrentPrice(code?: string): Promise<any> {
    await this.setToken()

    try {
      if (!code) {
        throw new HttpException('required code', 400)
      }

      const { data } = await this.httpService.axiosRef.get(
        '/uapi/domestic-stock/v1/quotations/inquire-price',
        {
          headers: {
            tr_id: 'FHKST01010100',
          },
          params: {
            fid_cond_mrkt_div_code: 'J',
            fid_input_iscd: code,
          },
        },
      )

      console.log(data.output)
    } catch (err) {
      if (err.response && err.response.data) {
        throw new HttpException(err.response.data.msg1, err.response.status)
      } else {
        throw err
      }
    }

    return { message: 'OK' }
  }

  async getDomesticCandle() {
    await this.setToken()

    try {
      const { data } = await this.httpService.axiosRef.get(
        '/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice',
        {
          headers: {
            tr_id: 'FHKST03010100',
          },
          params: {
            fid_cond_mrkt_div_code: 'J',
            fid_input_iscd: '360750',
            fid_input_date_1: '20230130',
            fid_input_date_2: '20230130',
            fid_period_div_code: 'W',
            fid_org_adj_prc: '0',
          },
        },
      )

      console.log(data)
    } catch (err) {
      if (err.response && err.response.data) {
        throw new HttpException(err.response.data.msg1, err.response.status)
      } else {
        throw err
      }
    }

    return { message: 'OK' }
  }

  // TODO: 국내 주식 먼저 구현 후 해외 주식 구현
  async getCurrentPrice(symbol: string): Promise<number> {
    await this.setToken()

    try {
      const { url, config } = await this.kisHelper.getCurrentPriceRequest(
        symbol,
      )

      const {
        data,
        data: { msg_cd, msg1 },
      } = await this.httpService.axiosRef.get(url, config)

      if (msg_cd !== 'MCA00000') {
        throw new NotFoundException(msg1)
      }

      if (data.output.rsym === '') {
        throw new NotFoundException('not found symbol')
      }

      return Number(data.output.last)
    } catch (err) {
      if (err.response && err.response.data) {
        throw new HttpException(err.response.data.msg1, err.response.status)
      } else {
        throw err
      }
    }
  }

  // TODO: 국내 주식 먼저 구현 후 해외 주식 구현
  async getDailyPrice(symbol: string, date: string, count: number) {
    await this.setToken()

    try {
      const { url, config } = await this.kisHelper.getDailyPriceRequest(
        symbol,
        date,
      )

      const {
        data,
        data: { msg_cd, msg1 },
      } = await this.httpService.axiosRef.get(url, config)

      if (msg_cd !== 'MCA00000') {
        throw new NotFoundException(msg1)
      }

      if (data.output1.rsym === '') {
        throw new NotFoundException('not found symbol')
      }

      return data.output2.map(this.kisHelper.convertDailyPrice).slice(0, count)
    } catch (err) {
      if (err.response && err.response.data) {
        throw new HttpException(err.response.data.msg1, err.response.status)
      } else {
        throw err
      }
    }
  }

  // TODO: access_token 관리방법 필요
  private async setToken() {
    try {
      // const {
      //   data: { access_token },
      // } = await this.httpService.axiosRef.post('/oauth2/tokenP', {
      //   grant_type: 'client_credentials',
      //   appkey: this.kisAppKey,
      //   appsecret: this.kisAppSecret,
      // })

      // this.setAuthorizationHeader(access_token)
      // console.log(access_token)

      this.setAuthorizationHeader(
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjEzMWZlYzgwLTQzNzMtNGZlZC1hMjBjLTVkZWI1ODdjODI5NCIsImlzcyI6InVub2d3IiwiZXhwIjoxNjc1OTQ4Nzk5LCJpYXQiOjE2NzU4NjIzOTksImp0aSI6IlBTUEc5NUxsS3B4Rk9obWxmUVRMdlVXTlRSZWZLTFBlZGVNOSJ9.pE83h2Aswv-waNaNeNgjQfRAnDV7_zV7kATGOpra1GsqSujzy62RUMlAlTLY5kmtqxinR5aLmDnb_gGmoyzfNw',
      )
    } catch (err) {
      if (err.response && err.response.data) {
        throw new HttpException(
          err.response.data.error_description,
          err.response.status,
        )
      } else {
        throw err
      }
    }
  }

  private setHeader(key: string, value: string) {
    this.httpService.axiosRef.defaults.headers.common[key] = value
  }

  private setAuthorizationHeader(token: string) {
    this.httpService.axiosRef.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token}`
  }
}

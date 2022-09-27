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
      this.setAuthorizationHeader(
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6ImFkYTNkYjlmLWE1ZWMtNDRhMC1iMjM4LTFkZTEwZGE4ZjkzOSIsImlzcyI6InVub2d3IiwiZXhwIjoxNjY0Mzc5NzcxLCJpYXQiOjE2NjQyOTMzNzEsImp0aSI6IlBTUEc5NUxsS3B4Rk9obWxmUVRMdlVXTlRSZWZLTFBlZGVNOSJ9.hLU-hLdeRjkP9KqdQNNpEPcJMT4q-4FLjcZvsNBN6_aY41o9r3FU96AZ7ljhOqGZFIffEH8js8tQFs3ApXa0GA',
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

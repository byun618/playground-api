import { HttpException, Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AxiosError } from 'axios'
import api, { setHeader } from './api'
import * as moment from 'moment-timezone'

@Injectable()
export class KisService {
  constructor(private config: ConfigService) {
    setHeader('appkey', this.config.get('KIS_APP_KEY'))
    setHeader('appsecret', this.config.get('KIS_APP_SECRET'))
  }

  async test() {
    console.log('kis test')
  }

  async setToken() {
    try {
      //   const {
      //     data: { access_token },
      //   } = await api.post('/oauth2/tokenP', {
      //     grant_type: 'client_credentials',
      //     appkey: this.config.get('KIS_APP_KEY'),
      //     appsecret: this.config.get('KIS_APP_SECRET'),
      //   })

      setHeader(
        'Authorization',
        `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6ImVlMzAwM2I2LTRmZTgtNGRjMC1iZDU0LTRlZGM5NjU3NzFmNCIsImlzcyI6InVub2d3IiwiZXhwIjoxNjYzOTM4MTY4LCJpYXQiOjE2NjM4NTE3NjgsImp0aSI6IlBTUEc5NUxsS3B4Rk9obWxmUVRMdlVXTlRSZWZLTFBlZGVNOSJ9.F_Cj5MBGPnLInla0nkuSlh4RNkXOcmyHgEo8A9hd2CJSSfCEDeu6-qDzOagekw7LGNo-HEIIKgJTKBJ_su8Jjg`,
      )
    } catch (err: any) {
      if (err instanceof AxiosError) {
        const { error_description } = err.response.data

        throw new HttpException(error_description, 400)
      }

      throw err
    }
  }

  async getCurrentPrice() {
    try {
      await this.setToken()

      const excd = 'NAS'
      const symb = 'TSLA'

      const {
        data,
        data: { msg_cd, msg1 },
      } = await api.get(
        `/uapi/overseas-price/v1/quotations/price?excd=${excd}&symb=${symb}&auth=''`,
        {
          headers: {
            tr_id: 'HHDFS00000300',
          },
        },
      )

      if (msg_cd !== 'MCA00000') {
        throw new NotFoundException(msg1)
      }

      if (data.output.rsym === '') {
        throw new NotFoundException('not found symbol')
      }

      return Number(data.output.last)
    } catch (err: any) {
      throw err
    }
  }

  async getDailyPrice() {
    try {
      await this.setToken()

      const excd = 'NAS'
      const symb = 'TSLA'

      const {
        data,
        data: { msg_cd, msg1 },
      } = await api.get(
        `/uapi/overseas-price/v1/quotations/dailyprice?excd=${excd}&symb=${symb}&auth=''&gubn=0&modp=0&bymd=20220429`,
        {
          headers: {
            tr_id: 'HHDFS76240000',
          },
        },
      )

      if (msg_cd !== 'MCA00000') {
        throw new NotFoundException(msg1)
      }

      if (data.output1.rsym === '') {
        throw new NotFoundException('not found symbol')
      }

      return data.output2.map((data) => ({
        date: moment(data.xymd).format('YYYY-MM-DD'),
        close: Number(data.clos),
        sign: data.sign,
        diff: Number(data.diff),
        rate: Number(data.rate),
        open: Number(data.open),
        high: Number(data.high),
        low: Number(data.low),
      }))
    } catch (err: any) {
      throw err
    }
  }
}

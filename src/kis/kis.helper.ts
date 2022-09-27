import { Injectable } from '@nestjs/common'
import * as moment from 'moment-timezone'

@Injectable()
export class KisHelper {
  get ExchangeCode() {
    return {
      TSLA: 'NAS',
      ADD: 'AMD',
    }
  }

  getCurrentPriceRequest(symbol: keyof typeof this.ExchangeCode) {
    const exchangeCode = this.ExchangeCode[symbol]

    return {
      url: `/uapi/overseas-price/v1/quotations/price?excd=${exchangeCode}&symb=${symbol}&auth=''`,
      config: {
        headers: {
          tr_id: 'HHDFS00000300',
        },
      },
    }
  }

  getDailyPriceRequest(symbol: keyof typeof this.ExchangeCode, date: string) {
    const exchangeCode = this.ExchangeCode[symbol]

    return {
      url: `/uapi/overseas-price/v1/quotations/dailyprice?excd=${exchangeCode}&symb=${symbol}&auth=''&gubn=0&modp=0&bymd=${date}`,
      config: {
        headers: {
          tr_id: 'HHDFS76240000',
        },
      },
    }
  }

  convertDailyPrice(data: any) {
    return {
      date: moment(data.xymd).format('YYYY-MM-DD'),
      close: Number(data.clos),
      sign: data.sign,
      diff: Number(data.diff),
      rate: Number(data.rate),
      open: Number(data.open),
      high: Number(data.high),
      low: Number(data.low),
    }
  }
}

import { Injectable } from '@nestjs/common'
import * as moment from 'moment-timezone'
import { StockRepository } from '../database/repository'

@Injectable()
export class KisHelper {
  constructor(private readonly stockRepository: StockRepository) {}

  async getCurrentPriceRequest(symbol: string) {
    const exchangeCode = await this.stockRepository.getExchangeCodeBySymbol(
      symbol,
    )

    return {
      url: `/uapi/overseas-price/v1/quotations/price?excd=${exchangeCode}&symb=${symbol}&auth=''`,
      config: {
        headers: {
          tr_id: 'HHDFS00000300',
        },
      },
    }
  }

  async getDailyPriceRequest(symbol: string, date: string) {
    const exchangeCode = await this.stockRepository.getExchangeCodeBySymbol(
      symbol,
    )

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

import { Injectable } from '@nestjs/common'
import { USDMClient } from 'binance'

@Injectable()
export class BinanceService {
  private client: USDMClient

  constructor() {
    this.client = new USDMClient({
      api_key: process.env.BINANCE_API_KEY,
      api_secret: process.env.BINANCE_SECRET_KEY,
    })
  }

  getCurrentPrice = async () => {
    const data = await this.client.getSymbolPriceTicker({
      symbol: 'EOSUSDT',
    })

    console.log(data)
  }
}

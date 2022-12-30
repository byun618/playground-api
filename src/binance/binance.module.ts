import { Global, Module } from '@nestjs/common'
import { BinanceService } from './binance.service'

@Global()
@Module({
  providers: [BinanceService],
  exports: [BinanceService],
})
export class BinanceModule {}

import { Global, Module } from '@nestjs/common'
import {
  CryptoRepository,
  ExchangeRepository,
  StockSectorRepository,
  StockRepository,
  UserRepository,
} from './repository'

@Global()
@Module({
  providers: [
    UserRepository,
    ExchangeRepository,
    StockRepository,
    CryptoRepository,
    StockSectorRepository,
  ],
  exports: [
    UserRepository,
    ExchangeRepository,
    StockRepository,
    CryptoRepository,
    StockSectorRepository,
  ],
})
export class DatabaseModule {}

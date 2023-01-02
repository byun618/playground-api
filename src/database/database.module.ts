import { Global, Module } from '@nestjs/common'
import {
  CryptoRepository,
  ExchangeRepository,
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
  ],
  exports: [
    UserRepository,
    ExchangeRepository,
    StockRepository,
    CryptoRepository,
  ],
})
export class DatabaseModule {}

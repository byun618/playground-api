import { Global, Module } from '@nestjs/common'
import {
  CryptoRepository,
  ExchangeRepository,
  SectorRepository,
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
    SectorRepository,
  ],
  exports: [
    UserRepository,
    ExchangeRepository,
    StockRepository,
    CryptoRepository,
    SectorRepository,
  ],
})
export class DatabaseModule {}

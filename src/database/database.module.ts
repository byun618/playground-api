import { Global, Module } from '@nestjs/common'
import {
  CryptoRepository,
  EtfIndexRepository,
  EtfRepository,
  ExchangeRepository,
  StockRepository,
  StockSectorRepository,
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
    EtfIndexRepository,
    EtfRepository,
  ],
  exports: [
    UserRepository,
    ExchangeRepository,
    StockRepository,
    CryptoRepository,
    StockSectorRepository,
    EtfIndexRepository,
    EtfRepository,
  ],
})
export class DatabaseModule {}

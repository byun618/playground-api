import { Global, Module } from '@nestjs/common'
import {
  CryptoRepository,
  EtfIndexRepository,
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
  ],
  exports: [
    UserRepository,
    ExchangeRepository,
    StockRepository,
    CryptoRepository,
    StockSectorRepository,
    EtfIndexRepository,
  ],
})
export class DatabaseModule {}

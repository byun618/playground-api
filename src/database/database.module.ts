import { Global, Module } from '@nestjs/common'
import {
  ExchangeRepository,
  StockRepository,
  UserRepository,
} from './repository'

@Global()
@Module({
  providers: [UserRepository, ExchangeRepository, StockRepository],
  exports: [UserRepository, ExchangeRepository, StockRepository],
})
export class DatabaseModule {}

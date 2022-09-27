import { Global, Module } from '@nestjs/common'
import { StockSymbolRepository, UserRepository } from './repository'

@Global()
@Module({
  providers: [UserRepository, StockSymbolRepository],
  exports: [UserRepository, StockSymbolRepository],
})
export class DatabaseModule {}

import { Global, Module } from '@nestjs/common'
import { KisService } from './kis.service'

@Global()
@Module({
  providers: [KisService],
  exports: [KisService],
})
export class KisModule {}

import { HttpModule } from '@nestjs/axios'
import { Global, Module } from '@nestjs/common'
import { KisHelper } from './kis.helper'
import { KisService } from './kis.service'

@Global()
@Module({
  imports: [HttpModule],
  providers: [KisService, KisHelper],
  exports: [KisService],
})
export class KisModule {}

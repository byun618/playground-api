import { Injectable } from '@nestjs/common'
import { KisService } from '../kis/kis.service'

@Injectable()
export class UserService {
  constructor(private kis: KisService) {}

  async test() {
    await this.kis.test()
  }
}

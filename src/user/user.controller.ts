import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common'
import { GetUser } from '../auth/decorator/get-user.decorator'
import { JwtGuard } from '../auth/guard/jwt.guard'
import { BinanceService } from '../binance/binance.service'
import { User } from '../database/entity'
import { KisService } from '../kis/kis.service'
import { EditMeDto } from './dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly kisService: KisService,
    private readonly binanceService: BinanceService,
  ) {}

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return { me: user }
  }

  @Get('test')
  async test() {
    // return this.kisService.getCurrentPrice('TSLA')
    return this.binanceService.getCurrentPrice()
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  editMe(@GetUser('id') userId: number, @Body() editMeDto: EditMeDto) {
    return this.userService.editMe(userId, editMeDto)
  }
}

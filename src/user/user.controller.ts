import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common'
import * as fs from 'fs'
import { GetUser } from '../auth/decorator/get-user.decorator'
import { JwtGuard } from '../auth/guard/jwt.guard'
import { BinanceService } from '../binance/binance.service'
import { User } from '../database/entity'
import {
  ExchangeRepository,
  StockSectorRepository,
  StockRepository,
  EtfIndexRepository,
  EtfRepository,
} from '../database/repository'
import { KisService } from '../kis/kis.service'
import { EditMeDto } from './dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly kisService: KisService,
    private readonly binanceService: BinanceService,
    private readonly stockRepository: StockRepository,
    private readonly exchangeRepository: ExchangeRepository,
    private readonly stockSectorRepository: StockSectorRepository,
    private readonly etfIndexRepository: EtfIndexRepository,
    private readonly etfRepository: EtfRepository,
  ) {}

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return { me: user }
  }

  @Get('test')
  async test() {
    const etf = await this.etfRepository.findOne({
      select: {
        code: true,
      },
      where: {
        id: 1,
      },
    })

    const stock = await this.stockRepository.findOne({
      select: {
        code: true,
      },
      where: {
        id: 1,
      },
    })

    // return {
    //   etf,
    //   stock,
    // }

    return this.kisService.getDomesticCandle()
    // return this.kisService.getDomesticCurrentPrice(stock.code)
    // return this.kisService.getCurrentPrice('TSLA')
    // return this.binanceService.getCurrentPrice()
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  editMe(@GetUser('id') userId: number, @Body() editMeDto: EditMeDto) {
    return this.userService.editMe(userId, editMeDto)
  }

  @UseGuards(JwtGuard)
  @Get('me/cryptos')
  getUserCryptos(@GetUser('id') userId: number) {
    return this.userService.getUserCryptos(userId)
  }

  @UseGuards(JwtGuard)
  @Post('me/cryptos')
  createUserCrypto(@GetUser('id') userId: number) {
    return this.userService.createUserCrypto(userId)
  }
}

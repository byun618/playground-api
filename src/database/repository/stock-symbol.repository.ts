import { Injectable, NotFoundException } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { StockSymbol } from '../entity'

@Injectable()
export class StockSymbolRepository extends Repository<StockSymbol> {
  constructor(dataSource: DataSource) {
    super(
      StockSymbol,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    )
  }

  async createStockSymbol(symbol: string, name: string, exchangeCode: string) {
    const stockSymbol = this.create({
      key: symbol,
      name,
      exchangeCode,
    })

    await this.save(stockSymbol)

    console.log(stockSymbol)
  }

  async findExchangeCodeBySymbol(symbol: string): Promise<string> {
    const stockSymbol = await this.findOne({
      select: {
        exchangeCode: true,
      },
      where: { key: symbol },
    })

    if (!stockSymbol) {
      throw new NotFoundException('not found stock symbol')
    }

    return stockSymbol.exchangeCode
  }
}

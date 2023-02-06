import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { Stock } from '../entity'

@Injectable()
export class StockRepository extends Repository<Stock> {
  constructor(dataSource: DataSource) {
    super(
      Stock,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    )
  }

  async getExchangeCodeBySymbol(symbol: string): Promise<string> {
    const stock = await this.findOne({
      select: {
        exchange: {
          code: true,
        },
      },
      where: {
        code: symbol,
      },
      relations: ['exchange'],
    })

    return stock.exchange.code
  }

  async getAllStocks() {
    return this.find({
      select: {
        id: true,
        code: true,
        name: true,
        exchange: {
          id: true,
          code: true,
          country: true,
          imageUrl: true,
        },
      },
      relations: ['exchange'],
    })
  }
}

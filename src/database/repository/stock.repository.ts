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

  async findExchangeCodeBySymbol(symbol: string) {
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
}

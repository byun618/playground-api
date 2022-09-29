import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { Exchange } from '../entity'

@Injectable()
export class ExchangeRepository extends Repository<Exchange> {
  constructor(dataSource: DataSource) {
    super(
      Exchange,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    )
  }
}

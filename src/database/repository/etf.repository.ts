import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { Etf } from '../entity'

@Injectable()
export class EtfRepository extends Repository<Etf> {
  constructor(dataSource: DataSource) {
    super(Etf, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}

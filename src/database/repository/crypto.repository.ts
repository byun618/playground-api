import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { Crypto } from '../entity'

@Injectable()
export class CryptoRepository extends Repository<Crypto> {
  constructor(dataSource: DataSource) {
    super(
      Crypto,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    )
  }
}

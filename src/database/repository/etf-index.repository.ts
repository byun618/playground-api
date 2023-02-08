import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { EtfIndex } from '../entity'

@Injectable()
export class EtfIndexRepository extends Repository<EtfIndex> {
  constructor(dataSource: DataSource) {
    super(
      EtfIndex,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    )
  }
}

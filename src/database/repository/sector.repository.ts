import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { Sector } from '../entity/sector.entity'

@Injectable()
export class SectorRepository extends Repository<Sector> {
  constructor(dataSource: DataSource) {
    super(
      Sector,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    )
  }
}

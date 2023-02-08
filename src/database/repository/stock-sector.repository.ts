import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { StockSector } from '../entity/stock-sector.entity'

@Injectable()
export class StockSectorRepository extends Repository<StockSector> {
  constructor(dataSource: DataSource) {
    super(
      StockSector,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    )
  }
}

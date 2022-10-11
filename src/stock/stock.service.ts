import { Injectable } from '@nestjs/common'
import { StockRepository } from '../database/repository'

@Injectable()
export class StockService {
  constructor(private readonly stockRepository: StockRepository) {}

  async getAllStocks() {
    return this.stockRepository.getAllStocks()
  }
}

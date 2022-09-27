import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'

@Entity('stockSymbols')
@Unique(['key', 'exchangeCode'])
export class StockSymbol {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  key: string

  @Column()
  name: string

  @Column()
  exchangeCode: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
import { Exchange } from './exchange.entity'

@Entity('stocks')
@Unique(['code', 'name'])
export class Stock {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  code: string

  @Column()
  name: string

  @ManyToOne((type) => Exchange, (exchange) => exchange.id, { eager: false })
  exchange: Exchange

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

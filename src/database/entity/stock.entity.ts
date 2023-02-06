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
import { Sector } from './sector.entity'

@Entity('stocks')
@Unique('code_name_unique', ['code', 'name'])
export class Stock {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  code: string

  @Column()
  name: string

  @Column({
    nullable: true,
  })
  imageUrl: string

  @ManyToOne((type) => Exchange, (exchange) => exchange.id, { eager: false })
  exchange: Exchange

  @ManyToOne((type) => Sector, (sector) => sector.id, { eager: false })
  sector: Sector

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

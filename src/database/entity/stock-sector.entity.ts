import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Stock } from './stock.entity'

@Entity('stockSectors')
export class StockSector {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true,
  })
  name: string

  @Column({
    nullable: true,
  })
  imageUrl: string

  @OneToMany((type) => Stock, (stock) => stock.stockSector, { eager: false })
  stocks: Stock[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

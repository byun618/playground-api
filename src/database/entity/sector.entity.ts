import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Stock } from './stock.entity'

@Entity('sectors')
export class Sector {
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

  @OneToMany((type) => Stock, (Stock) => Stock.exchange, { eager: false })
  stocks: Stock[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
import { Stock } from './stock.entity'

@Entity('exchanges')
@Unique(['code', 'name'])
export class Exchange {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  code: string

  @Column()
  name: string

  @Column()
  countryName: string

  @Column({
    nullable: true,
  })
  countryImageUrl?: string

  @OneToMany((type) => Stock, (Stock) => Stock.exchange, { eager: false })
  symbols: Stock[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

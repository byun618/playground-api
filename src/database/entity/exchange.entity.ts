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
@Unique('code_name_unique', ['code', 'name'])
export class Exchange {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  code: string

  @Column()
  name: string

  @Column()
  country: string

  @Column({
    nullable: true,
  })
  imageUrl?: string

  @OneToMany((type) => Stock, (stock) => stock.exchange, { eager: false })
  stocks: Stock[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

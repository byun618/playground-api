import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'

@Entity('cryptos')
@Unique('ticker_name_unique', ['ticker', 'name'])
export class Crypto {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  ticker: string

  @Column()
  name: string

  @Column()
  imageUrl: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

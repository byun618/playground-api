import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('cryptos')
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

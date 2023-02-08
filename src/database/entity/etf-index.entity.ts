import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Etf } from './etf.entity'

@Entity('etfIndexes')
export class EtfIndex {
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

  @OneToMany((type) => Etf, (etf) => etf.etfIndex, { eager: false })
  etfs: Etf[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

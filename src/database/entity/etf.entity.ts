import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
import { EtfIndex } from './etf-index.entity'

@Entity('etfs')
@Unique('code_name_unique', ['code', 'name'])
export class Etf {
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

  @ManyToOne((type) => EtfIndex, (etfIndex) => etfIndex.id, {
    eager: false,
  })
  etfIndex: EtfIndex

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

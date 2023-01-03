import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Crypto } from './crypto.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true,
  })
  email: string

  @Column()
  password: string

  @Column({
    nullable: true,
  })
  name?: string

  @Column({
    nullable: true,
  })
  phone?: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToMany(() => Crypto)
  @JoinTable({
    name: 'userCryptos',
    joinColumn: {
      name: 'userId',
    },
    inverseJoinColumn: {
      name: 'cryptoId',
    },
  })
  cryptos: Crypto[]
}

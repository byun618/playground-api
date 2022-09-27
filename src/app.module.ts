import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseModule } from './database/database.module'
import { UserModule } from './user/user.module'
import { KisModule } from './kis/kis.module'
import { StockSymbol, User } from './database/entity'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.local'] }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      timezone: 'local',
    }),
    AuthModule,
    DatabaseModule,
    UserModule,
    KisModule,
  ],
})
export class AppModule {}

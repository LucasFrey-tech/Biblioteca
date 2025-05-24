// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entidades/user.entity';
import { UsersModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin123',
      database: 'alejandria',
      entities: [User],
      synchronize: true, 
    }),
    ConfigModule.forRoot({
    isGlobal: true, 
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}


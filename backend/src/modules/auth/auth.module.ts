import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from '../../entidades/user.entity'
import {AuthService} from './auth.service';
import {LoginController,RegisterController} from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [LoginController,RegisterController],
  providers: [AuthService],
})
export class AppModule {}
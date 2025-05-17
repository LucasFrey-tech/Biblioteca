import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from '@nestjs/typeorm';
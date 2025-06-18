import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({example: 1, description: 'ID único del Usuario'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Lucas', description: 'Nombre del Usuario'})
  @Column()
  firstname: string;

  @ApiProperty({example: 'Frey', description: 'Apellido del Usuario'})
  @Column()
  lastname: string;

  @ApiProperty({example: 'Tukson', description: 'Sobrenombre del Usuario'})
  @Column()
  username: string;

  @ApiProperty({example: 'correonofalso@gmail.com', description: 'Correo Electronico del Usuario'})
  @Column({ unique: true })
  email: string;

  @ApiProperty({example: 'asdasd', description: 'Contraseña del Usuario'})
  @Column()
  password: string;

  @ApiProperty({description: 'Numero de Telefono del Usuario'})
  @Column({ default: ''})
  tel?: string;

  @ApiProperty({description: 'Valor que Determina si el Usuario es Admin o no'})
  @Column({ default: false })
  admin: boolean;

  @ApiProperty({description: 'Valor que Determina si el Usuario esta Bloqueado'})
  @Column({ default: false })
  disabled: boolean;

  @ApiProperty({example: '05-06-2025', description: 'Fecha de Registro del Usuario'})
  @CreateDateColumn({ name: 'registration_date' })
  registrationDate: Date;
}
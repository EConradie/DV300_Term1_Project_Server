import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Otp {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  phone!: string;

  @Column()
  otp!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
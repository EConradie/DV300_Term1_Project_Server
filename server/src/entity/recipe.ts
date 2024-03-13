//TODO: entity
//id , name, description, amountCrafter

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Recipe {

    @PrimaryGeneratedColumn()
    id!: number ;

    @Column({length:225})
    name!: string;

    @Column({length:225})
    description!: string;

    @Column()
    amountCrafted!: number;
}
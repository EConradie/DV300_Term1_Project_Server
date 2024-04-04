import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { Items } from "./items";


@Entity()
export class Packages {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string

    @Column()
    category!: string

    @Column()
    image!: string

    @Column()
    description!: string

    @OneToMany(type => Items, (items) => items.package)
    items?: Items[];

    @Column()
    amountCrafted!: number;

    @Column()
    inventoryId!: number;

}


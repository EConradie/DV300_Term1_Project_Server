import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { Items } from "./items";
import { Inventory } from "./inventory";

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

    @ManyToOne(type => Inventory, inventory => inventory.packages)
    inventory!: Inventory;

}


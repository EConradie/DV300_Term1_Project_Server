import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Items } from "./items";
import { Warehouse } from "./warehouses";
import { Packages } from "./packages";

@Entity()
export class Inventory {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    quantity!: number

    @OneToMany(() => Items, items => items.inventory)
    items!: Items[];

    @ManyToOne(() => Warehouse, warehouse => warehouse.inventory)
    warehouse!: Warehouse

    @Column()
    location!: string

    @OneToMany(type => Packages, packages => packages.inventory)
    packages!: Packages[];

}
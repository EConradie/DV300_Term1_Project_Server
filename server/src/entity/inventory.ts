import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Items } from "./items";
import { Warehouse } from "./warehouses";

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

}
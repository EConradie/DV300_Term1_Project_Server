import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Inventory } from "./inventory";
import { Packages } from "./packages";

@Entity()
export class Items {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    category!: string

    @Column()
    brand!: string

    @Column()
    price!: number

    @Column()
    quantity!: number

    @Column()
    model!: string

    @Column()
    icon!: string

    @ManyToOne(() => Inventory, inventory => inventory.item)
    inventoryItems!: Inventory[]

    @ManyToOne(() => Packages, packages => packages.items)
    package!: Packages
}


import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Inventory } from "./inventory";

@Entity()
export class Warehouse {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "Location" })
    location!: string;

    @Column({ name: "Capacity" })
    capacity!: number;

    @Column({ name: "Image" })
    image!: string;

    @Column({ name: "Description" })
    description!: string;

    @OneToMany(() => Inventory, (inventory: Inventory) => inventory.warehouse)
    inventory!: Inventory;
}
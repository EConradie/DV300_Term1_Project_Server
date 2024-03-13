import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Inventory {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    itemsId!: number;

    @Column()
    warehouseId!: number;

    @Column()
    quantity!: number;
}
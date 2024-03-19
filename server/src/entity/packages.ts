import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Packages {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({length:225})
    warehouseID!: string;

    @Column({length:225})
    ItemID!: string;

    @Column({length:225})
    name!: string;

    @Column({length:225})
    category!: string;

    @Column()
    price!: number;

    @Column()
    quantity!: number;

    @Column()
    date!: Date;

    @Column({length:225})
    image!: string;

    @Column({length:225})
    description!: string;
}
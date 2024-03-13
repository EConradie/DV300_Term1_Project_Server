import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Items {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    category!: string;

    @Column()
    brand!: string;

    @Column()
    price!: number;

    @Column()
    amount!: number;

    @Column()
    model!: string;

    @Column()
    icon!: string;

    @Column()
    description!: string;
}


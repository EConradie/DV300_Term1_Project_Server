import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Inventory {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    catergory!: string;

    @Column()
    icon!: string;

    @Column()
    description!: string;

    @Column()
    amount!: number;
}


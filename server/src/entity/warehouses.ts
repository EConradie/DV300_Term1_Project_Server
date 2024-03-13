import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}
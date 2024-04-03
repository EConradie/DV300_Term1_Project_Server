import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 225, name: "username" })
  username!: string;

  @Column({ name: "number", type: "varchar", length: 20 })
  number!: string;

  @Column({ name: "image" })
  image?: string = "default.jpg";

  @Column({ name: "isLoggedIn" })
  isLoggedIn!: boolean;
}

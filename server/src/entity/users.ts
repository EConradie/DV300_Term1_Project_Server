import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({length: 225, name: 'username'})
    username!: string ;

    @Column({name: 'number'})
    number!: number ;

    @Column({name: 'isLoggedIn'})
    isLoggedIn!: boolean;

    @Column({name: 'image'})
    image: string = 'default.jpg'

}
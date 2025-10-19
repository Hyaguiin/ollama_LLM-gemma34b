import { Column, Entity } from "typeorm";

@Entity()
export class EntityChat{
    @Column({type: 'varchar'})
    BotHistory: string[];

  @Column({type: 'varchar'})
    humanHistory: string[];

    @Column({type: 'int', })
    chatLenght: number;
}
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Place {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  place: string;
}

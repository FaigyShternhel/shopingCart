import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  taz: string;

  @Column({
    nullable: true,
  }) firstName: string;

  @Column({
    nullable: true,
  })
  lastName: string;

  @Column({ type: "date", nullable: true })
  birthdate: Date;

  @Column({
    nullable: true,
  })
  personalId: string;

  @Column({
    nullable: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  address: string;
}
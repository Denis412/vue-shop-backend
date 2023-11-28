import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryColumn({ type: String })
  id: string;

  @MinLength(5)
  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  middle_name: string;

  @Column({ nullable: true })
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @MinLength(8)
  @IsNotEmpty()
  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

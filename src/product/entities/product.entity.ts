import { Cart } from 'src/cart/entities/cart.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'int', default: 1 })
  type: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, default: 0, type: 'float' })
  price: number;

  @ManyToMany(() => Cart, (cart) => cart.products)
  @JoinTable()
  carts: Cart[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  udpated_at: Date;
}

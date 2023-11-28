import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';
import { Product } from 'src/product/entities/product.entity';
import { Expose, Type } from 'class-transformer';

interface relationInput {
  id: string;
}

export class UpdateCartDto {
  products: relationInput[];
}

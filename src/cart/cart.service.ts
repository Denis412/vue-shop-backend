import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { generateId } from 'src/helpers/generate-id.helper';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private repository: Repository<Cart>,
    private productService: ProductService,
  ) {}

  create(input: CreateCartDto) {
    return this.repository.save({ id: generateId(), ...input });
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, input: UpdateCartDto) {
    const products: Product[] = [];

    for (const index in input.products) {
      const product = await this.productService.findOne(
        input.products[index].id,
      );

      if (product) products.push(product);
      else
        throw new NotFoundException(
          `Товар с id ${input.products[index].id} не найден`,
        );
    }

    return this.repository.save({ id, products });
  }
}

import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { generateId } from 'src/helpers/generate-id.helper';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private repository: Repository<Product>,
  ) {}
  create(input: CreateProductDto) {
    return this.repository.save({ id: generateId(), ...input });
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    if (!id) return null;
    return this.repository.findOneBy({ id });
  }

  update(id: string, input: UpdateProductDto) {
    return this.repository.save({ id, ...input });
  }

  remove(id: string) {
    return this.repository.delete(id);
  }
}

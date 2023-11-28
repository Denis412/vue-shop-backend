import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  create(input: CreateUserDto) {
    return this.repository.save(input);
  }

  findAll() {
    return this.repository.find();
  }

  findOneById(id: string) {
    return this.repository.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  update(id: string, input: UpdateUserDto) {
    return this.repository.save({ id, ...input });
  }
}

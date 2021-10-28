import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLContext } from 'src/@types';
import { Repository } from 'typeorm';
import { NewUser } from './dto/new-user.dto';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    this.usersRepository = usersRepository;
  }

  async createUser(dto: NewUser): Promise<Omit<User, 'password'>> {
    try {
      const currentUser = await this.usersRepository.findOne({
        email: dto.email,
      });

      if (currentUser)
        throw new HttpException(
          'Email is already being user',
          HttpStatus.BAD_REQUEST,
        );

      const newRecord = await this.usersRepository.create(dto);
      const user = await this.usersRepository.save(newRecord);

      delete user.password;
      return user;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(ctx: GraphQLContext) {
    console.log(ctx);
  }
}

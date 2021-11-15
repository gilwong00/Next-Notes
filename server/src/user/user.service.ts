import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLContext } from 'src/@types';
import { Repository } from 'typeorm';
import { LoginUser } from './dto/login-user.dto';
import { NewUser } from './dto/new-user.dto';
import { User } from './models/user.model';
import { verify } from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {
    this.usersRepository = usersRepository;
  }

  async createUser(dto: NewUser): Promise<Omit<User, 'password'>> {
    try {
      const currentUser = await this.usersRepository.findOne({
        email: dto.email
      });

      if (currentUser)
        throw new HttpException(
          'Email is already being user',
          HttpStatus.BAD_REQUEST
        );

      const newRecord = await this.usersRepository.create(dto);
      const user = await this.usersRepository.save(newRecord);

      delete user.password;
      return user;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(
    { username, password }: LoginUser,
    ctx: GraphQLContext
  ): Promise<Partial<User>> {
    try {
      const query = username.includes('@')
        ? { where: { email: username } }
        : { where: { username: username } };

      const user = await this.usersRepository.findOneOrFail(query);

      if (user) {
        const doesPasswordMatch = await verify(user.password, password);

        if (!doesPasswordMatch)
          throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);

        ctx.req.session.userId = user.id;
        delete user.password;
        return user;
      }
      throw new HttpException('Could not find user', HttpStatus.NOT_FOUND);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUsers() {
    try {
      return await this.usersRepository.find({});
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserById(id: string) {
    try {
      console.log('YEET');
      const user = await this.usersRepository.findOneOrFail({ id });
      return user;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLContext } from 'src/@types';
import { NewUser } from './dto/new-user.dto';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  @Mutation(() => User)
  async createuser(
    @Args('newUserInput') newUserInput: NewUser,
    @Context() ctx: GraphQLContext,
  ): Promise<Partial<User>> {
    return await this.userService.createUser(newUserInput);
  }

  async login(@Context() ctx: GraphQLContext) {
    return await this.userService.login(ctx);
  }
}

import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import { GraphQLContext } from 'src/@types';
import { isAuthGuard } from 'src/guards/isAuth.guard';
import { Note } from 'src/note/models/note.model';
import { NoteService } from 'src/note/note.service';
import { LoginUser } from './dto/login-user.dto';
import { NewUser } from './dto/new-user.dto';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly noteService: NoteService
  ) {
    this.userService = userService;
    this.noteService = noteService;
  }

  @Mutation(() => User)
  async createUser(
    @Args('newUserInput') newUserInput: NewUser
  ): Promise<Partial<User>> {
    return await this.userService.createUser(newUserInput);
  }

  @Mutation(() => User)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUser,
    @Context() ctx: GraphQLContext
  ): Promise<Partial<User>> {
    return await this.userService.login(loginUserInput, ctx);
  }

  @UseGuards(isAuthGuard)
  @Mutation(() => Boolean)
  async logout(@Context() ctx: GraphQLContext) {
    return new Promise((resolve) =>
      ctx.req.session.destroy((err: any) => {
        ctx.res.clearCookie('next_note_auth');

        if (err) {
          console.log(err);
          return resolve(false);
        }

        return resolve(true);
      })
    );
  }

  @Query(() => User)
  async whoami(@Context() ctx: GraphQLContext): Promise<Partial<User>> {
    // read from redis cache instead
    return await this.userService.getUserById(ctx.req.session.userId);
  }

  @ResolveField('notes', () => [Note])
  async getUserNotes(@Parent() user: User) {
    const { id } = user;
    return await this.noteService.getUserNotes(id);
  }
}

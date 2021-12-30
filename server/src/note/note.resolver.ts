import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLContext, NoteOrderBy } from 'src/@types';
import { isAuthGuard } from 'src/guards/isAuth.guard';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './models/note.model';
import { NoteService } from './note.service';

@Resolver(() => Note)
export class NoteResolver {
  constructor(private readonly noteService: NoteService) {
    this.noteService = noteService;
  }

  @UseGuards(isAuthGuard)
  @Query(() => [Note])
  async getUserNotes(
    @Args('orderBy', { nullable: true }) orderBy: NoteOrderBy,
    @Context() ctx: GraphQLContext
  ) {
    return await this.noteService.getUserNotes(ctx.req.session.userId, orderBy);
  }

  @Mutation(() => Note)
  @UseGuards(isAuthGuard)
  async createNote(
    @Args('createNoteInput') createNoteInput: CreateNoteDto,
    @Context() ctx: GraphQLContext
  ) {
    return this.noteService.createNote(createNoteInput, ctx);
  }
}

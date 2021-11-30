import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLContext } from 'src/@types';
import { isAuthGuard } from 'src/guards/isAuth.guard';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './models/note.model';
import { NoteService } from './note.service';

@Resolver(() => Note)
export class NoteResolver {
  constructor(private readonly noteService: NoteService) {
    this.noteService = noteService;
  }

  @Query(() => Note)
  async getNote() {
    return {} as Note;
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

import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLContext } from 'src/@types';
import { isAuthGuard } from 'src/guards/isAuth.guard';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './models/note.model';
import { NoteService } from './note.service';

@Resolver(() => Note)
export class NoteResolver {
  constructor(private readonly noteService: NoteService) {
    this.noteService = noteService;
  }

  @UseGuards(isAuthGuard)
  @Query(() => [Note])
  async getUserNotes(@Context() ctx: GraphQLContext) {
    return await this.noteService.getUserNotes(ctx.req.session.userId);
  }

  @Mutation(() => Note)
  @UseGuards(isAuthGuard)
  async createNote(
    @Args('createNoteInput') createNoteInput: CreateNoteDto,
    @Context() ctx: GraphQLContext
  ) {
    return await this.noteService.createNote(createNoteInput, ctx);
  }

  @Mutation(() => Note)
  @UseGuards(isAuthGuard)
  async updateNote(@Args('updateNoteInput') updateNoteInput: UpdateNoteDto) {
    return await this.noteService.updateNote(updateNoteInput);
  }

  @Mutation(() => Int)
  @UseGuards(isAuthGuard)
  async deleteNote(@Args('noteId', { type: () => Int }) noteId: number) {
    return await this.noteService.deleteNote(noteId);
  }
}

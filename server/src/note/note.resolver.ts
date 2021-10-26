import { Query, Resolver } from '@nestjs/graphql';
import { Note } from './models/note.model';

@Resolver(() => Note)
export class NoteResolver {
  constructor() {}

  @Query(() => Note)
  async getNote() {
    return {} as Note;
  }
}

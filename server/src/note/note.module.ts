import { Module } from '@nestjs/common';
import { NoteResolver } from './note.resolver';

@Module({
  providers: [NoteResolver]
})
export class NoteModule {}

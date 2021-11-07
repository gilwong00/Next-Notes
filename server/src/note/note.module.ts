import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './models/note.model';
import { NoteResolver } from './note.resolver';
import { NoteService } from './note.service';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  providers: [NoteResolver, NoteService],
  exports: [NoteService]
})
export class NoteModule {}

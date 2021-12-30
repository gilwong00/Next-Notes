import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLContext, NoteOrderBy, NOTE_EVENTS } from 'src/@types';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './models/note.model';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
    private eventEmitter: EventEmitter2
  ) {
    this.noteRepository = noteRepository;
    this.eventEmitter = eventEmitter;
  }

  async getUserNotes(
    userId: string,
    orderBy: NoteOrderBy = 'DESC'
  ): Promise<Array<Omit<Note, 'created_by' | 'date_added' | 'date_modified'>>> {
    try {
      const userNotes = await this.noteRepository.find({
        // relations: ['created_by'],
        where: {
          created_by: userId
        },
        order: {
          date_added: orderBy
        }
      });

      return userNotes.map((note: Note) => ({
        id: note.id,
        title: note.title,
        content: note.content,
        createdBy: note.created_by,
        dateAdded: note.date_added,
        dateModified: note.date_modified
      }));
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createNote(dto: CreateNoteDto, ctx: GraphQLContext): Promise<Note> {
    try {
      const newNote = await this.noteRepository.create({
        ...dto,
        created_by: ctx.req.session.userId
      });

      const note = await this.noteRepository.save(newNote);
      this.eventEmitter.emit(NOTE_EVENTS.NOTE_CREATE, note);

      return {
        ...note,
        createdBy: note.created_by,
        dateAdded: note.date_added,
        dateModified: note.date_modified
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

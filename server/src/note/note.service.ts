import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLContext, NoteResponse, NOTE_EVENTS } from 'src/@types';
import { mapNoteToResponse } from 'src/utils';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
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

  async getUserNotes(userId: string): Promise<Array<NoteResponse>> {
    try {
      const userNotes = await this.noteRepository.find({
        // relations: ['created_by'],
        where: {
          created_by: userId
        },
        order: {
          date_added: 'DESC'
        }
      });

      return userNotes.map(mapNoteToResponse);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createNote(
    dto: CreateNoteDto,
    ctx: GraphQLContext
  ): Promise<NoteResponse> {
    try {
      const newNote = await this.noteRepository.create({
        ...dto,
        created_by: ctx.req.session.userId
      });

      const note = await this.noteRepository.save(newNote);
      this.eventEmitter.emit(NOTE_EVENTS.NOTE_CREATE, note);

      return mapNoteToResponse(note);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateNote(dto: UpdateNoteDto): Promise<NoteResponse> {
    try {
      const res = await this.noteRepository
        .createQueryBuilder()
        .update(Note)
        .set({ title: dto.title, content: dto.content })
        .where('id = :id', {
          id: dto.id
        })
        .returning('*')
        .execute();
      const updated = res.raw[0] as Note;
      this.eventEmitter.emit(NOTE_EVENTS.NOTE_UPDATE, updated);
      return mapNoteToResponse(updated);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteNote(noteId: number): Promise<number> {
    try {
      const res = await this.noteRepository.delete({ id: noteId });
      this.eventEmitter.emit(NOTE_EVENTS.NOTE_DELETE, noteId);

      if (res.affected > 0) return noteId;
      else
        throw new HttpException(
          'Failed to delete note',
          HttpStatus.BAD_REQUEST
        );
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

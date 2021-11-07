import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './models/note.model';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>
  ) {
    this.noteRepository = noteRepository;
  }

  async getUserNotes(userId: string) {
    try {
      const userNotes = await this.noteRepository.find({
        relations: ['created_by'],
        where: {
          created_by: {
            id: userId
          }
        }
      });

      return userNotes;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

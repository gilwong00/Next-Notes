import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { OnEvent } from '@nestjs/event-emitter';
import { NoteResponse, NOTE_EVENTS, SearchResult } from 'src/@types';
import { Note } from 'src/note/models/note.model';
import { mapNoteToResponse } from 'src/utils';

@Injectable()
export class SearchService {
  private index = 'notes';
  constructor(private readonly elasticsearchService: ElasticsearchService) {
    this.elasticsearchService = elasticsearchService;
  }

  @OnEvent(NOTE_EVENTS.NOTE_CREATE)
  async indexNote(note: Note): Promise<unknown> {
    return this.elasticsearchService.index({
      index: this.index,
      body: {
        id: note.id,
        title: note.title,
        content: note.content,
        createdBy: note.created_by
      }
    });
  }

  async search(text: string): Promise<Array<NoteResponse>> {
    const { body } = await this.elasticsearchService.search({
      index: this.index,
      body: {
        query: {
          multi_match: {
            fields: ['title', 'content'],
            query: text,
            fuzziness: 5
          }
        }
      }
    });

    const response = body.hits.hits.map(({ _source }: SearchResult<Note>) =>
      mapNoteToResponse(_source)
    );
    return response;
  }

  @OnEvent(NOTE_EVENTS.NOTE_UPDATE)
  async updateDocument(note: Note) {
    const script = Object.entries(note).reduce((result, [key, value]) => {
      return `${result} ctx._source.${key}='${value}';`;
    }, '');

    this.elasticsearchService.updateByQuery<Note>({
      index: this.index,
      body: {
        query: {
          match: {
            id: note.id
          }
        },
        script: {
          inline: script
        }
      }
    });
  }

  @OnEvent(NOTE_EVENTS.NOTE_DELETE)
  async deleteDocument(noteId: number) {
    return this.elasticsearchService.deleteByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id: noteId
          }
        }
      }
    });
  }
}

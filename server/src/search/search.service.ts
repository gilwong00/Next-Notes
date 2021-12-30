import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { OnEvent } from '@nestjs/event-emitter';
import { NOTE_EVENTS } from 'src/@types';
import { Note } from 'src/note/models/note.model';

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

  async search(text: string) {
    const { body } = await this.elasticsearchService.search({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ['title', 'content']
          }
        }
      }
    });

    const hits = body.hits.hits;
    return hits.map((item: any) => item._source);
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
}

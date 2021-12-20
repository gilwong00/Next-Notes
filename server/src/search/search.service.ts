import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Note } from 'src/note/models/note.model';

@Injectable()
export class SearchService {
  private index = 'notes';
  constructor(private readonly elasticsearchService: ElasticsearchService) {
    this.elasticsearchService = elasticsearchService;
  }

  async indexNote(note: Note) {
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
}

import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { isAuthGuard } from 'src/guards/isAuth.guard';
import { Note } from 'src/note/models/note.model';
import { SearchService } from './search.service';

@Resolver()
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {
    this.searchService = searchService;
  }

  @Query(() => [Note])
  @UseGuards(isAuthGuard)
  async searchNotes(@Args('searchText') searchText: string) {
    return await this.searchService.search(searchText);
  }
}

import { SearchUsersCommand, ISearchResponse, ISearch } from '@mp/api/search/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Search } from '../models';
import { SearchRepository } from '@mp/api/search/data-access';

@CommandHandler(SearchUsersCommand)
export class SearchUsersCommandHandler
  implements ICommandHandler<SearchUsersCommand, ISearchResponse>
{
  constructor(
    private publisher: EventPublisher,
    private searchRepository: SearchRepository
    ) {}
  async execute(command: SearchUsersCommand) {
    const request = command.request.search;
    var searchResult = await this.searchRepository.search_for(request.field, request.field, "profiles");
    console.log(searchResult)
    var response: ISearchResponse = {search: {keyword: request.keyword, field: request.field, searchResults: searchResult}}
    return response;
  }
}

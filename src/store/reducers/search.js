import { SEARCH_FOR_VIDEOS } from "../actions/search";
import { SUCCESS, REQUEST } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case SEARCH_FOR_VIDEOS[SUCCESS]:
      return reduceSearchForVideos(action.response, action.searchQuery);
    case SEARCH_FOR_VIDEOS[REQUEST]:
      return action.nextPageToken ? state : {};
    default:
      return state;
  }
}

function reduceSearchForVideos(response, searchQuery, prevState) {
  let searchResults = response.items.map(item => ({
    ...item,
    id: item.id.videoId
  }));
  if (prevState.query === searchQuery) {
    const prevResults = prevState.result || [];
    searchResults = prevResults.concat(searchResults);
  }
  return {
    totalResult: response.pageInfo.totalResult,
    nextPageToken: response.nextPageToken,
    query: searchQuery,
    result: searchResults
  };
}

export const getSearchResults = state => state.search.results;
export const getSearchNextPageToken = state => state.search.nextPageToken;

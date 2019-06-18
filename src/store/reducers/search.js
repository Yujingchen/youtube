import { SEARCH_FOR_VIDEO } from "../actions/search";
import { SUCCESS } from "../actions";
import { createSelector } from "reselect";
const initialState = {
  byVideo: {},
  byId: {}
};
export default function(state = {}, action) {
  switch (action.type) {
    case SEARCH_FOR_VIDEO[SUCCESS]:
      return reduceSearchForVideos(action.response, action.searchQuery);
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

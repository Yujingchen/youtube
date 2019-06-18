import * as searchActions from "../actions/search";
import * as api from "../api/youtube-api";
import { REQUEST } from "../actions";
import { fork, take } from "redux-saga/effects";
import { fetchEntiry } from "./index";
export function* watchSearchForVideos() {
  while (true) {
    const { searchQuery, amount, nextPageToken } = yield take(
      searchActions.SEARCH_FOR_VIDEOS[REQUEST]
    );
    yield fork(searchQuery, searchQuery, amount, nextPageToken);
  }
}

export function* searchFroVideos(searchQuery, nextPageToken, amount) {
  const request = api.buildSearchRequest.bind(
    null,
    searchQuery,
    nextPageToken,
    amount
  );
  yield fetchEntiry(request, searchActions.forVideos, searchQuery);
}

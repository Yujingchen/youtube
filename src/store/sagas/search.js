import * as searchActions from "../actions/search";
import * as api from "../api/youtube-api";
import { REQUEST } from "../actions";
import { fork, take } from "redux-saga/effects";
import { fetchEntity } from "./index";

// export function* watchSearchForVideos() {
//   while (true) {
//     const { searchQuery, nextPageToken, amount } = yield take(
//       searchActions.SEARCH_FOR_VIDEOS[REQUEST]
//     );
//     yield fork(searchForVideos, searchQuery, nextPageToken, amount);
//   }
// }

export function* watchSearchForVideos() {
  while (true) {
    const { searchQuery, nextPageToken, amount } = yield take(
      searchActions.SEARCH_FOR_VIDEOS[REQUEST]
    );
    console.log(searchQuery, nextPageToken);
    yield fork(searchForVideos, searchQuery, nextPageToken, amount);
  }
}

// export function* searchForVideos(searchQuery, nextPageToken, amount) {
//   const request = api.buildSearchRequest.bind(
//     null,
//     searchQuery,
//     nextPageToken,
//     amount
//   );
//   yield fetchEntity(request, searchActions.forVideos, searchQuery);
// }

export function* searchForVideos(searchQuery, nextPageToken, amount) {
  const request = api.buildSearchRequest.bind(
    null,
    searchQuery,
    nextPageToken,
    amount
  );
  yield fetchEntity(request, searchActions.forVideos, searchQuery);
}

// export function* watchMostPopularVideos() {
//   while (true) {
//     const { amount, loadDescription, nextPageToken } = yield take(
//       videoActions.MOST_POPULAR[REQUEST]
//     );

//     yield fork(fetchMostPopularVideos, amount, loadDescription, nextPageToken);
//     //parse payload from action and fork a saga worker that doing the actual job
//   }
// }
// //watcher saga listening for certian type of action
// //Question: when is the request action is kicked off? and where the parameters of MOST_POPULAR[REQUEST] come from?
// export function* fetchMostPopularVideos(
//   amount,
//   loadDescription,
//   nextPageToken
// ) {
//   const request = api.buildMostPopularVideosRequest.bind(
//     null,
//     amount,
//     loadDescription,
//     nextPageToken
//   );
//   //use the perameter to build the request
//   yield fetchEntity(request, videoActions.mostPopular);
// }

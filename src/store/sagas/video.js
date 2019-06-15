import { put, call, fork, take, takeEvery, all } from "redux-saga/effects";
import * as api from "../api/youtube-api";
import * as videoActions from "../actions/video";
import { REQUEST } from "../actions";
import { fetchEntity, ignoreErrors } from "./index";

export function* watchMostPopularVideos() {
  while (true) {
    const { amount, loadDescription, nextPageToken } = yield take(
      videoActions.MOST_POPULAR[REQUEST]
    );

    yield fork(fetchMostPopularVideos, amount, loadDescription, nextPageToken);
    //parse payload from action and fork a saga worker that doing the actual job
  }
}
//watcher saga listening for certian type of action
//Question: when is the request action is kicked off? and where the parameters of MOST_POPULAR[REQUEST] come from?
export function* fetchMostPopularVideos(
  amount,
  loadDescription,
  nextPageToken
) {
  const request = api.buildMostPopularVideosRequest.bind(
    null,
    amount,
    loadDescription,
    nextPageToken
  );
  //use the perameter to build the request
  yield fetchEntity(request, videoActions.mostPopular);
}
export function* watchVideoCategories() {
  yield takeEvery(videoActions.VIDEO_CATEGORIES[REQUEST], fetchVideoCategories);
}

export const fetchVideoCategories = fetchEntity.bind(
  null,
  api.buildVideoCategoriesRequest,
  videoActions.categories
);
//use bind will return a new function

export function* watchMostPopularVideosByCategory() {
  while (true) {
    const { categories } = yield take(
      videoActions.MOST_POPULAR_BY_CATEGORY[REQUEST]
    );
    yield fork(fetchMostPopularVideosByCategory, categories);
  }
}

export function* fetchMostPopularVideosByCategory(categories) {
  const requests = categories.map(category => {
    const wrapper = ignoreErrors(
      api.buildMostPopularVideosRequest,
      12,
      false,
      null,
      category
    );
    return call(wrapper);
  });
  try {
    const response = yield all(requests);
    console.log(response);
    yield put(videoActions.mostPopularByCategory.success(response, categories));
  } catch (error) {
    yield put(videoActions.mostPopularByCategory.failure(error));
  }
}

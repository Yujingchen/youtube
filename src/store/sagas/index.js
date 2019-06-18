import { all, call, put, fork } from "redux-saga/effects";
import {
  watchMostPopularVideos,
  watchMostPopularVideosByCategory,
  watchVideoCategories
} from "./video";
import { watchWatchDetails } from "./watch";
import { watchSearchForVideos } from "./search";

export default function*() {
  yield all([
    fork(watchMostPopularVideos),
    fork(watchVideoCategories),
    fork(watchMostPopularVideosByCategory),
    fork(watchWatchDetails),
    fork(watchSearchForVideos)
  ]);
}
//run watcher saga for listening to certian type of action
//yield
/*
... rest unchange for now
*/

/*
 * entity must have a success, request and failure method
 * request is a function that returns a promise when called
 * */
export function* fetchEntity(request, entity, ...args) {
  try {
    const response = yield call(request);
    //make api call and save the response
    // we directly return the result object and throw away the headers and the status text here
    // if status and headers are needed, then instead of returning response.result, we have to return just response.
    yield put(entity.success(response.result, ...args));
  } catch (error) {
    yield put(entity.failure(error, ...args));
  }
}

export function ignoreErrors(fn, ...args) {
  return () => {
    const ignoreErrorCallback = response => response;
    return fn(...args).then(ignoreErrorCallback, ignoreErrorCallback);
  };
}

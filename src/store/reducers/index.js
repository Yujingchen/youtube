import apiReducer from "./api";
import { combineReducers } from "redux";
import videosReducer from "./video";
export default combineReducers({
  api: apiReducer,
  videos: videosReducer
});

export function ignoreErros(fn, ...args) {
  return () => {
    const ignoreErrorCallback = response => response;
    return fn(...args).then(ignoreErrorCallback, ignoreErrorCallback);
  };
}

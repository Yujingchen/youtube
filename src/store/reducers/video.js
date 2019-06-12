import { MOST_POPULAR, VIDEO_CATEGORIES } from "../actions/video";
import { SUCCESS } from "../actions";
import { createSelector } from "reselect";

const initialState = {
  byId: {},
  mostPopular: {},
  categories: {}
};

export default function videos(state = initialState, action) {
  switch (action.type) {
    case MOST_POPULAR[SUCCESS]:
      return reduceFetchMostPopularVideos(action.response, state);
    case VIDEO_CATEGORIES[SUCCESS]:
      return reduceFetchVideoCategories(action.response, state);
    default:
      return state;
  }
}

function reduceFetchMostPopularVideos(response, prevState) {
  const videoMap = response.items.reduce((accumulator, video) => {
    accumulator[video.id] = video;
    return accumulator;
  }, {});
  //create an video map object that maps all the video with their id
  // "byId": {
  //     "FLqvTE1Eqfg": {
  //      "kind": "youtube#video",
  //      "etag": "\"XI7nbFXulYBIpL0ayR_gDh3eu1k/rzYqHJdz-a40clbPa3V5RJul7XU\"",
  //      "...": "..."
  //   }
  let items = Object.keys(videoMap);
  //get the keys from object, like "FLqvTE1Eqfg" which will return a object, use ...items to expand it to the exist items
  //check if items is already filled with data, if yes only append the new items into the object
  if (response.hasOwnProperty("prevPageToken") && prevState.mostPopular) {
    items = [...prevState.mostPopular.item, ...items];
  }
  // if not means the items object is empty, then append items with totalResult and nextPageToken
  const mostPopular = {
    totalResults: response.pageInfo.totalResults,
    nextPageToken: response.nextPageToken,
    items
  };

  return {
    ...prevState,
    mostPopular,
    byId: { ...prevState.byId, ...videoMap }
  };
}
function reduceFetchVideoCategories(response, prevState) {
  const categoryMapping = response.items.reduce((accumulator, category) => {
    accumulator[category.id] = category.snippet.title;
    return accumulator;
  }, {});
  return {
    ...prevState,
    categories: categoryMapping
  };
}

export const getMostPopularVideos = createSelector(
  state => state.videos.byId,
  state => state.videos.mostPopular,
  (videosById, mostPopular) => {
    if (!mostPopular || !mostPopular.items) {
      return [];
    }
    return mostPopular.items.map(videoId => videosById[videoId]);
  }
);

export const getVideoCategoryIds = createSelector(
  state => state.videos.categories,
  categories => {
    return Object.keys(categories || {});
  }
);

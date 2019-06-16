import {
  MOST_POPULAR,
  VIDEO_CATEGORIES,
  MOST_POPULAR_BY_CATEGORY
} from "../actions/video";
import { SUCCESS } from "../actions";
import { createSelector } from "reselect";

const initialState = {
  byId: {},
  mostPopular: {},
  categories: {},
  byCategory: {}
};

export default function videos(state = initialState, action) {
  switch (action.type) {
    case MOST_POPULAR[SUCCESS]:
      return reduceFetchMostPopularVideos(action.response, state);
    case VIDEO_CATEGORIES[SUCCESS]:
      return reduceFetchVideoCategories(action.response, state);
    case MOST_POPULAR_BY_CATEGORY[SUCCESS]:
      return reduceFetchMostPopularVideosByCategory(
        action.response,
        action.categories,
        state
      );
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
  // console.log(response);
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
    // console.log(Object.keys(categories || {}));
    return Object.keys(categories || {});
  }
);

function reduceFetchMostPopularVideosByCategory(
  responses,
  categories,
  prevState
) {
  let videoMap = {};
  let byCategoryMap = {};

  responses.forEach((response, index) => {
    // ignore answer if there was an error
    if (response.status === 400) return;

    const categoryId = categories[index];
    const { byId, byCategory } = groupVideosByIdAndCategory(response.result);
    videoMap = { ...videoMap, ...byId };
    //map of video same as mostpoupular video map
    byCategoryMap[categoryId] = byCategory;
    //map if category like 1,2,3,4
  });

  // compute new state
  return {
    ...prevState,
    byId: { ...prevState.byId, ...videoMap },
    byCategory: { ...prevState.byCategory, ...byCategoryMap }
  };
}

function groupVideosByIdAndCategory(response) {
  const videos = response.items;
  const byId = {};
  const byCategory = {
    totalResults: response.pageInfo.totalResults,
    nextPageToken: response.nextPageToken,
    items: []
  };

  videos.forEach(video => {
    byId[video.id] = video;

    const items = byCategory.items;
    if (items && items) {
      items.push(video.id);
    } else {
      byCategory.items = [video.id];
    }
  });

  return { byId, byCategory };
}

export const getVideosByCategory = createSelector(
  state => state.videos.byCategory,
  state => state.videos.byId,
  state => state.videos.categories,
  (videosByCategory, videosById, categories) => {
    return Object.keys(videosByCategory || {}).reduce(
      (accumulator, categoryId) => {
        const videoIds = videosByCategory[categoryId].items;
        const categoryTitle = categories[categoryId];
        accumulator[categoryTitle] = videoIds.map(
          videoId => videosById[videoId]
        );
        return accumulator;
      },
      {}
    );
  }
);

export const videoCategoriesLoaded = createSelector(
  state => state.videos.categories,
  categories => {
    return Object.keys(categories || {}).length !== 0;
  }
);

export const videosByCategoryLoaded = createSelector(
  state => state.videos.byCategory,
  videosByCategory => {
    return Object.keys(videosByCategory || {}).length !== 0;
  }
);

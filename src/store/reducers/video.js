import {
  MOST_POPULAR,
  VIDEO_CATEGORIES,
  MOST_POPULAR_BY_CATEGORY
} from "../actions/video";
import { WATCH_DETAILS, VIDEO_DETAILS } from "../actions/watch";
import { SUCCESS } from "../actions";
import { createSelector } from "reselect";
import {
  VIDEO_LIST_RESPONSE,
  SEARCH_LIST_RESPONSE
} from "../api/youtube-response-types";
import { getSearchParam } from "../../services/url/index";

const initialState = {
  byId: {},
  mostPopular: {},
  categories: {},
  byCategory: {},
  related: {}
};

export default function videos(state = initialState, action) {
  switch (action.type) {
    case VIDEO_CATEGORIES[SUCCESS]:
      return reduceFetchVideoCategories(action.response, state);
    case MOST_POPULAR[SUCCESS]:
      return reduceFetchMostPopularVideos(action.response, state);
    case MOST_POPULAR_BY_CATEGORY[SUCCESS]:
      return reduceFetchMostPopularVideosByCategory(
        action.response,
        action.categories,
        state
      );
    case WATCH_DETAILS[SUCCESS]:
      return reduceWatchDetails(action.response, state);
    case VIDEO_DETAILS[SUCCESS]:
      return reduceVideoDetails(action.response, state);
    default:
      return state;
  }
}

function reduceFetchMostPopularVideos(response, prevState) {
  const videoMap = response.items.reduce((accumulator, video) => {
    accumulator[video.id] = video;
    return accumulator;
  }, {});

  let items = Object.keys(videoMap);
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
export const videoCategoriesLoaded = createSelector(
  state => state.videos.categories,
  categories => {
    return Object.keys(categories || {}).length !== 0;
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
export const getVideoCategoryIds = createSelector(
  state => state.videos.categories,
  categories => {
    return Object.keys(categories || {});
  }
);

export const videosByCategoryLoaded = createSelector(
  state => state.videos.byCategory,
  videosByCategory => {
    return Object.keys(videosByCategory || {}).length !== 0;
  }
);

function reduceWatchDetails(responses, prevState) {
  const videoDetailResponse = responses.find(
    response => response.result.kind === VIDEO_LIST_RESPONSE
  );
  const video = videoDetailResponse.result.items[0];
  const byIdEntry = { [video.id]: video };
  const relatedEntry = { [video.id]: reduceRelatedVideoRequest(responses) };
  return {
    ...prevState,
    byId: {
      ...prevState.byId,
      ...byIdEntry
    },
    related: {
      ...prevState.related,
      ...relatedEntry
    }
  };
}

function reduceRelatedVideoRequest(responses) {
  const relatedVideoReponse = responses.find(
    response => response.result.kind === SEARCH_LIST_RESPONSE
  );
  const { pageInfo, items, nextPageToken } = relatedVideoReponse.result;
  const relatedVideoIds = items.map(video => {
    return video.id;
  });

  return {
    totalResults: pageInfo.totalResults,
    nextPageToken,
    items: relatedVideoIds
  };
}

function reduceVideoDetails(responses, prevState) {
  const videoResponses = responses.filter(
    response => response.result.kind === VIDEO_LIST_RESPONSE
  );
  const parsedVideos = videoResponses.reduce((videoMap, response) => {
    const video = response.result.items ? response.result.items[0] : null;
    if (!video) {
      return videoMap;
    }
    videoMap[video.id] = video;
    return videoMap;
  }, {});
  return {
    ...prevState,
    byId: { ...prevState.byId, ...parsedVideos }
  };
}

const getRelatedVideoIds = (state, videoId) => {
  const related = state.videos.related[videoId];
  return related ? related.items : [];
};
export const getRelatedVideos = createSelector(
  getRelatedVideoIds,
  state => state.videos.byId,

  (relatedVideoIds, videos) => {
    if (relatedVideoIds) {
      // filter kicks out null values we might have
      //videoId return a object which contains the actuall id in videoId field
      return relatedVideoIds
        .map(videoId => videos[videoId.videoId])
        .filter(video => video);
    }
    return [];
  }
);

//selector for getting channelId from byId
export const getChannelId = (state, location, name) => {
  const videoId = getSearchParam(location, name);
  const video = state.videos.byId[videoId];
  if (video) {
    return video.snippet.channelId;
  }
  return null;
};

export const getVideoById = (state, videoId) => {
  return state.videos.byId[videoId];
};

export const getAmountComments = createSelector(
  getVideoById,
  video => {
    if (video) {
      return video.statistics.commentCount;
    }
    return 0;
  }
);

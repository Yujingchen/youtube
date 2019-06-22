//binding 3 different action creator function in a object
//more simplify, this is a action collection for type MOST_POPULAR
import {
  createAction,
  createRequestTypes,
  REQUEST,
  SUCCESS,
  FAILURE
} from "./index";

export const MOST_POPULAR = createRequestTypes("MOST_POPULAR");
//MOST_POPULAR Type OBJECT
export const mostPopular = {
  request: (amount, loadDescription, nextPageToken) =>
    createAction(MOST_POPULAR[REQUEST], {
      amount,
      loadDescription,
      nextPageToken
    }),
  success: response => createAction(MOST_POPULAR[SUCCESS], { response }),
  failure: response => createAction(MOST_POPULAR[FAILURE], { response })
};
//mostPopular actions object
export const VIDEO_CATEGORIES = createRequestTypes("VIDEO_CATEGORIES");
export const categories = {
  request: () => createAction(VIDEO_CATEGORIES[REQUEST], {}),
  success: response => createAction(VIDEO_CATEGORIES[SUCCESS], { response }),
  failure: response => createAction(VIDEO_CATEGORIES[FAILURE], { response })
};

export const MOST_POPULAR_BY_CATEGORY = createRequestTypes(
  "MOST_POPULAR_BY_CATEGORY"
);
export const mostPopularByCategory = {
  request: categories =>
    //categories is like a colloectio of ids
    createAction(MOST_POPULAR_BY_CATEGORY[REQUEST], { categories }),
  success: (response, categories) =>
    createAction(MOST_POPULAR_BY_CATEGORY[SUCCESS], { response, categories }),
  failure: response => createAction(MOST_POPULAR_BY_CATEGORY[FAILURE], response)
};

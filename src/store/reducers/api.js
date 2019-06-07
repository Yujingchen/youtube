import { YOUTUBE_LIBRARY_LOADED } from "../actions/api";

const initialStata = {
  libraryLoaded: false
};

export default function(state = initialStata, action) {
  switch (action.type) {
    case YOUTUBE_LIBRARY_LOADED:
      return {
        libraryLoaded: true
      };
    default:
      return state;
  }
}

export const getYoutubeLibraryLoaded = state => state.api.libraryLoaded;

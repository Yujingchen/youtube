import React, { Component } from "react";
import * as videoActions from "../../store/actions/video";
import {
  getMostPopularVideos,
  getMostPopularVideosNextPageToken,
  allMostPopularVideosLoaded
} from "../../store/reducers/video";
import { getYoutubeLibraryLoaded } from "../../store/reducers/api";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { VideoList } from "../../components/VideoList/VideoList";
class Trending extends Component {
  componentDidMount() {
    this.fetchTrendingVideos();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.youtubeLibraryLoaded !== this.props.youtubeLibraryLoaded) {
      this.fetchTrendingVideos();
    }
  }

  fetchTrendingVideos() {
    if (this.props.youtubeLibraryLoaded) {
      this.props.fetchMostPopularVideos(20, true);
    }
  }

  render() {
    const loaderActive = this.shouldShowLoader();

    return (
      <div>
        <VideoList
          bottomReachedCallback={this.fetchMoreVideos}
          showLoader={loaderActive}
          videos={this.props.videos}
        />
      </div>
    );
  }

  shouldShowLoader() {
    return !this.props.allMostPopularVideosLoaded;
  }

  fetchMoreVideos = () => {
    const { nextPageToken } = this.props;
    if (this.props.youtubeLibraryLoaded && nextPageToken) {
      this.props.fetchMostPopularVideos(50, true, nextPageToken);
    }
  };
}

//get state from redux store with selectors
function mapStateToProps(state) {
  return {
    videos: getMostPopularVideos(state),
    youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
    allMostPopularVideosLoaded: allMostPopularVideosLoaded(state),
    nextPageToken: getMostPopularVideosNextPageToken(state)
  };
}

//actions and dispatch
function mapDispatchToProps(dispatch) {
  const fetchMostPopularVideos = videoActions.mostPopular.request;
  return bindActionCreators({ fetchMostPopularVideos }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trending);

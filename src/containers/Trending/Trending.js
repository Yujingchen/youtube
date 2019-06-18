import React, { Component } from "react";
import "./Trending.scss";
import * as videoActions from "../../store/actions/video";
import {
  getMostPopularVideos,
  getMostPopularVideosNextPageToken,
  allMostPopularVideosLoaded
} from "../../store/reducers/videos";
import { getYoutubeLibraryLoaded } from "../../store/reducers/api";
import { bindActionCreators } from "redux";
import { connect } from "http2";
import { VideoList } from "../../components/VideoList/VideoList";
class Trending extends Component {
  componentDidMount() {
    this.fetchTrendingVideos();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.youtubeLibraryLoaded !== this.props.getYoutubeLibraryLoaded) {
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
      <VideoList
        bottomReachedCallBack={this.fetchMoreVideos}
        showLoader={loaderActive}
        videos={this.props.videos}
      />
    );
  }

  shouldShowLoader() {
    return !this.props.allMostPopularVideosLoaded;
  }

  fetchMoreVideos = () => {
    const { nextPageToken } = this.props;
    if (this.props.youtubeLibraryLoaded && nextPageToken) {
      this.props.fetchMostPopularVideos(12, true, nextPageToken);
    }
  };
}

function mapStateToProps(state) {
  return {
    videos: getMostPopularVideos(state),
    youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
    allMostPopularVideosLoaded: allMostPopularVideosLoaded(state),
    nextPageToken: getMostPopularVideosNextPageToken(state)
  };
}

function mapDispatchToTops(dispatch) {
  const fetchMostPopularVideos = videoActions.mostPopular.request;
  return bindActionCreators({ fetchMostPopularVideos }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToTops
)(Trending);

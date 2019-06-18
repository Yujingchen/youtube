import React, { Component } from "react";
import "./Trending.scss";
import { VideoPreview } from "../../components/VideoPreview/VideoPreview";
import { SideBar } from "../SideBar/SideBar";
import * as videoActions from "../../store/actions/video";
import {
  getMostPopularVideos,
  getMostPopularVideosNextPageToken,
  allMostPopularVideosLoaded
} from "../../store/reducers/videos";
import { getYoutubeLibraryLoaded } from "../../store/reducers/api";
import { bindActionCreators } from "redux";
import { connect } from "http2";
import { InfiniteScroll } from "../../components/InfiniteScroll/InfiniteScroll";
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
    const previews = this.getVideoPreviews();
    return (
      <React.forwardRef>
        <SideBar />
        <div className="trending">
          <InfiniteScroll
            bottomReachedCallback={this.fetchMoreVideos}
            showLoader={loaderActive}
          >
            {previews}
          </InfiniteScroll>
        </div>
      </React.forwardRef>
    );
  }

  shouldShowLoader() {
    return !this.props.allMostPopularVideosLoaded;
  }
  getVideoPreviews() {
    return this.props.videos.map(video => (
      <VideoPreview
        horizontal={true}
        expanded={true}
        video={video}
        key={video.id}
        pathname={"/watch"}
        search={`?v=` + video.id}
      />
    ));
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

import React from "react";
// import "./Watch.scss";
// import Video from "../../components/Video/Video";
// import RelatedVideos from "../../components/RelatedVideos/RelatedVideos";
// import VideoMetadata from "../../components/VideoMetadata/VideoMetadata";
// import VideoInfoBox from "../../components/VideoInfoBox/VideoInfoBox";
// import Comments from "../Comments/Comments";
import WatchContent from "./WatchContent/WatchContent";
import { bindActionCreators } from "redux";
import * as watchAction from "../../store/actions/watch";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getYoutubeLibraryLoaded } from "../../store/reducers/api";

class Watch extends React.Component {
  componentDidMount() {
    if (this.props.youtubeLibraryLoaded) {
      this.fetchWatchContent();
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.youtubeLibraryLoaded !== prevProps.youtubeLibraryLoaded) {
      this.fetchWatchContent();
    }
  }

  fetchWatchContent() {
    const videoId = this.getVideoId();
    if (!videoId) {
      this.props.history.push("/");
    }
    this.props.fetchWatchDetails(videoId, this.props.channelId);
  }
  getVideoId() {
    const searchParams = new URLSearchParams(this.props.location.search);
    return searchParams.get("v");
  }
  render() {
    const videoId = this.getVideoId();
    return (
      <WatchContent videoId={videoId} />
      // <div className="watch-grid">
      //   <Video className="video" id="-7fuHEEmEjs" />
      //   <VideoMetadata className="metadata" viewCount={1000} />
      //   <VideoInfoBox className="video-info-box" />
      //   <Comments className="comments" />
      //   <RelatedVideos className="relatedVideos" />
      // </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    youtubeLibraryLoaded: getYoutubeLibraryLoaded(state)
  };
}

function mapDispatchToProps(dispatch) {
  const fetchWatchDetails = watchAction.details.request;
  return bindActionCreators({ fetchWatchDetails }, dispatch);
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Watch)
);

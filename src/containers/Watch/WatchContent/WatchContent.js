import React from "react";
import Video from "../../../components/Video/Video";
import RelatedVideos from "../../../components/RelatedVideos/RelatedVideos";
import VideoMetadata from "../../../components/VideoMetadata/VideoMetadata";
import VideoInfoBox from "../../../components/VideoInfoBox/VideoInfoBox";
import Comments from "../../Comments/Comments";
import "./WatchContent.scss";
import { connect } from "react-redux";
import {
  getRelatedVideos,
  getAmountComments
} from "../../../store/reducers/video";
import { getChannel } from "../../../store/reducers/channel";
import { getCommentsForVideo } from "../../../store/reducers/comment";
// import { InfiniteScroll } from "../../../components/InfiniteScroll/InfiniteScroll";
export class WatchContent extends React.Component {
  render() {
    if (!this.props.videoId) {
      return <div />;
    }
    return (
      <div className="watch-grid">
        <Video className="video" id={this.props.videoId} />
        <VideoMetadata video={this.props.video} />
        <VideoInfoBox video={this.props.video} channel={this.props.channel} />

        <Comments
          comments={this.props.comments}
          amountComments={this.props.amountComments}
        />

        <RelatedVideos
          className="relatedVideos"
          videos={this.props.relatedVideos}
        />
      </div>
    );
  }
}

// function mapStateToProps(state, ownProps) {
//   const { videoId, channelId } = ownProps;

//   return {
//     relatedVideos: getRelatedVideos(state, videoId),
//     video: state.videos.byId[videoId],
//     channel: getChannel(state, channelId),
//     comments: getCommentsForVideo(state, ownProps.videoId),
//     // commentNextPageToken: getCommentNextPageToken(state, ownProps),
//     amountComments: getAmountComments(state, ownProps.videoId)
//   };
// }

function mapStateToProps(state, props) {
  return {
    video: state.videos.byId[props.videoId],
    relatedVideos: getRelatedVideos(state, props.videoId),
    comments: getCommentsForVideo(state, props.videoId),
    channel: getChannel(state, props.channelId),
    // commentNextPageToken: getCommentNextPageToken(state, props),
    amountComments: getAmountComments(state, props.videoId)
  };
}

export default connect(
  mapStateToProps,
  null
)(WatchContent);

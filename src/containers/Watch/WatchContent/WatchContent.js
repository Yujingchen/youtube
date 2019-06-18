import React from "react";
import Video from "../../../components/Video/Video";
import RelatedVideos from "../../../components/RelatedVideos/RelatedVideos";
import VideoMetadata from "../../../components/VideoMetadata/VideoMetadata";
import VideoInfoBox from "../../../components/VideoInfoBox/VideoInfoBox";
import Comments from "../../Comments/Comments";
import "./WatchContent.scss";
import { connect } from "react-redux";
import { getRelatedVideos } from "../../../store/reducers/video";
import { getChannel } from "../../../store/reducers/channel";
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

        <Comments amountComments={112499} />
        <RelatedVideos
          className="relatedVideos"
          videos={this.props.relatedVideos}
        />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { videoId, channelId } = ownProps;

  return {
    relatedVideos: getRelatedVideos(state, videoId),
    video: state.videos.byId[videoId],
    channel: getChannel(state, channelId)
  };
}

export default connect(
  mapStateToProps,
  null
)(WatchContent);

import React from "react";
import SideBar from "../../containers/SideBar/SideBar";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";
import VideoPreview from "../VideoPreview/VideoPreview";
import "./VideoList.scss";
export class VideoList extends React.Component {
  render() {
    const videoPreviews = this.getVideoPreviews();
    return (
      <React.Fragment>
        <SideBar />
        <div className="video-list">
          <InfiniteScroll
            bottomReachedCallback={this.props.bottomReachedCallback}
            showLoader={this.props.showLoader}
          >
            {videoPreviews}
          </InfiniteScroll>
        </div>
      </React.Fragment>
    );
  }
  getVideoPreviews() {
    if (!this.props.videos || !this.props.videos.length) {
      // console.log(this.props);
      return null;
    }

    const firstVideo = this.props.videos[0];
    if (!firstVideo.snippet.description) {
      return null;
    }
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
}

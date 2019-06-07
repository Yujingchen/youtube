import React, { Component } from "react";
import "./RelatedVideos.scss";
import VideoPreview from "../VideoPreview/VideoPreview";
import NextUpVideo from "./NextUpVideo/NextUpVideo";
export default class RelatedVideos extends Component {
  render() {
    return (
      <div className="related-videos">
        <NextUpVideo />
        <VideoPreview horizontal={true} />
        <VideoPreview horizontal={true} />
        <VideoPreview horizontal={true} />
        <VideoPreview horizontal={true} />
        <VideoPreview horizontal={true} />
      </div>
    );
  }
}

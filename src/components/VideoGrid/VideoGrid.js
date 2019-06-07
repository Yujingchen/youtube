import React from "react";
import VideoPreview from "../VideoPreview/VideoPreview";
import "./VideoGrid.scss";
import { Divider } from "semantic-ui-react";
import { VideoGridHeader } from "./VideoGridHeader/VideoGridHeader";
export function VideoGrid(props) {
  const divider = props.hideDivider ? null : <Divider />;
  return (
    <React.Fragment>
      <div className="video-section">
        <VideoGridHeader title="Trending" />
        <div className="video-grid">
          <VideoPreview />
          <VideoPreview />
          <VideoPreview />
          <VideoPreview />
          <VideoPreview />
          <VideoPreview />
          <VideoPreview />
          <VideoPreview />
          <VideoPreview />
          <VideoPreview />
          <VideoPreview />
          <VideoPreview />
        </div>
        {divider}
      </div>
    </React.Fragment>
  );
}

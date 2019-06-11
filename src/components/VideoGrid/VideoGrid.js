import React from "react";
import VideoPreview from "../VideoPreview/VideoPreview";
import "./VideoGrid.scss";
import { Divider } from "semantic-ui-react";
import VideoGridHeader from "./VideoGridHeader/VideoGridHeader";

export default function VideoGrid(props) {
  const divider = props.hideDivider ? null : <Divider />;

  if (!props.videos || !props.videos.length) {
    return <div />;
  }
  const gridItems = props.videos.map(video => {
    return <VideoPreview video={video} key={video.id} />;
  });

  return (
    <React.Fragment>
      <div className="video-section">
        <VideoGridHeader title={props.title} />
        <div className="video-grid">{gridItems}</div>
        {divider}
      </div>
    </React.Fragment>
  );
}

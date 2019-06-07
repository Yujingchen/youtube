import React from "react";
import "./Watch.scss";
import Video from "../../components/Video/Video";
import VideoPreview from "../../VideoPreview/VideoPreview";

export default class Watch extends React.Component {
  render() {
    return (
      // <div style={{ maxWidth: "80%" }}>
      //   <Video id="-7fuHEEmEjs" />
      // </div>
      <React.Fragment>
        <VideoPreview horizontal={true} />
        <VideoPreview />
      </React.Fragment>
    );
  }
}

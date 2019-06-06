import React, { Component } from "react";
import VideoPreview from "../../VideoPreview/VideoPreview";
import "./Home.scss";
export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <VideoPreview />
      </div>
    );
  }
}

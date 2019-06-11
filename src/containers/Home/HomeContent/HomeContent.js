import React, { Component } from "react";
import VideoGrid from "../../../components/VideoGrid/VideoGrid";
import "./HomeContent.scss";
export default class HomeContent extends Component {
  render() {
    return (
      <div className="home">
        <div className="responsive-video-grid-container">
          <VideoGrid title="trending" />
          <VideoGrid title="Autos & Vehicles" hideDivider={true} />
        </div>
      </div>
    );
  }
}

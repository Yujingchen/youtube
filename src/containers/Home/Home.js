import React, { Component } from "react";
import { VideoGrid } from "../../VideoGrid/VideoGrid";
import SideBar from "../../containers/SideBar/SideBar";
import "./Home.scss";
export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <SideBar />
        <div className="home">
          <div className="responsive-video-grid-container">
            <VideoGrid title="trending" />
            <VideoGrid title="Autos & Vehicles" hideDivider={true} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

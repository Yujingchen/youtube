import React, { Component } from "react";
import SideBarItem from "./SideBarItem/SideBarItem";
import { Menu, Divider } from "semantic-ui-react";
import "./SideBar.scss";
import SideBarHeader from "./SideBarHeader/SideBarHeader";
import Subscriptions from "./Subscriptions/Subscriptions";
import SideBarFooter from "./SideBarFooter/SideBarFooter";
export default class SideBar extends Component {
  render() {
    return (
      //Use samantic Menu to build vertical and fixed left sidebar
      <Menu borderless vertical stackable fixed="left" className="side-nav">
        <SideBarItem highlight={true} label="Home" icon="home" />
        <SideBarItem highlight={false} label="Trending" icon="fire" />
        <SideBarItem highlight={false} label="Followers" icon="spy" />
        <Divider />
        <SideBarHeader title="Library" />
        <SideBarItem highlight={false} label="History" icon="history" />
        <SideBarItem highlight={false} label="Watch later" icon="clock" />
        <SideBarItem highlight={false} label="Liked videos" icon="thumbs up" />
        <Divider />
        <Subscriptions />
        <SideBarHeader title="More from Youtube" />
        <SideBarItem highlight={false} label="Movies and Shows" icon="film" />
        <Divider />
        <SideBarItem highlight={false} label="Report history" icon="flag" />
        <SideBarItem highlight={false} label="Help" icon="help circle" />
        <SideBarItem highlight={false} label="Send feedback" icon="comment" />
        <Divider />
        <SideBarFooter />
      </Menu>
    );
  }
}

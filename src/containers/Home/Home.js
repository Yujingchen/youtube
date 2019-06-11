import React, { Component } from "react";
import { connect } from "react-redux";
import * as VideoActions from "../../store/actions/video";
import { bindActionCreators } from "redux";
import { getYoutubeLibraryLoaded } from "../../store/reducers/api";
import SideBar from "../../containers/SideBar/SideBar";
import HomeContent from "./HomeContent/HomeContent";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <SideBar />
        <HomeContent />
      </React.Fragment>
    );
  }
  componentDidMount() {
    if (this.props.youtubeLibraryLoaded) {
      this.props.fetchMostPopularVideos();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.youtubeLibraryLoaded !== prevProps.youtubeLibraryLoaded) {
      this.props.fetchMostPopularVideos();
    }
  }
}
const mapStateToProps = state => {
  return { youtubeLibraryLoaded: getYoutubeLibraryLoaded(state) };
};

const mapDispatchToProps = dispatch => {
  const fetchMostPopularVideos = VideoActions.mostPopular.request;
  return bindActionCreators({ fetchMostPopularVideos }, dispatch);
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

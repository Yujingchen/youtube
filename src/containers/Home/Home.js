import React, { Component } from "react";
import { connect } from "react-redux";
import * as VideoActions from "../../store/actions/video";
import { bindActionCreators } from "redux";
import { getYoutubeLibraryLoaded } from "../../store/reducers/api";
import SideBar from "../../containers/SideBar/SideBar";
import HomeContent from "./HomeContent/HomeContent";
import "./Home.scss";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <SideBar />
        <div className="home">
          <HomeContent />
        </div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    if (this.props.youtubeLibraryLoaded) {
      this.fetchCategoriesAndMostPopularVideos();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.youtubeLibraryLoaded !== prevProps.youtubeLibraryLoaded) {
      this.fetchCategoriesAndMostPopularVideos();
    }
  }

  fetchCategoriesAndMostPopularVideos() {
    this.props.fetchMostPopularVideos();
    this.props.fetchVideoCategories();
  }
}

const mapStateToProps = state => {
  return { youtubeLibraryLoaded: getYoutubeLibraryLoaded(state) };
};

function mapDispatchToProps(dispatch) {
  const fetchMostPopularVideos = VideoActions.mostPopular.request;
  const fetchVideoCategories = VideoActions.categories.request;
  return bindActionCreators(
    { fetchMostPopularVideos, fetchVideoCategories },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

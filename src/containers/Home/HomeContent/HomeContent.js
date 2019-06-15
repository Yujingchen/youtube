import VideoGrid from "../../../components/VideoGrid/VideoGrid";
import React from "react";
import "./HomeContent.scss";
import {
  getMostPopularVideos,
  getVideosByCategory
} from "../../../store/reducers/video";
import { connect } from "react-redux";

const AMOUNT_TRENDING_VIDEOS = 12;

class HomeContent extends React.Component {
  render() {
    const trendingVideos = this.getTrendingVideos();
    const categoryGrids = this.getVideoGridsForCategories();
    return (
      <div className="home-content">
        <div className="responsive-video-grid-container">
          <VideoGrid title="Trending" videos={trendingVideos} />
          {categoryGrids}
        </div>
      </div>
    );
  }

  getTrendingVideos() {
    return this.props.mostPopularVideos.slice(0, AMOUNT_TRENDING_VIDEOS);
  }

  getVideoGridsForCategories() {
    const categoryTitles = Object.keys(this.props.videosByCategory || {});
    return categoryTitles.map((categoryTitle, index) => {
      const videos = this.props.videosByCategory[categoryTitle];
      const hideDivider = index === categoryTitle.length - 1;
      return (
        <VideoGrid
          title={categoryTitle}
          videos={videos}
          key={categoryTitle}
          hideDivider={hideDivider}
        />
      );
    });
  }
}

function mapStateToProps(state) {
  return {
    mostPopularVideos: getMostPopularVideos(state),
    videosByCategory: getVideosByCategory(state)
  };
}
export default connect(
  mapStateToProps,
  null
)(HomeContent);

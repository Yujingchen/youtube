import React, { Component } from "react";
import "./Search.scss";
import { getYoutubeLibraryLoaded } from "../../store/reducers/api";
import * as searchActions from "../../store/actions/search";
import { connect } from "react-redux";
import {
  getSearchNextPageToken,
  getSearchResults
} from "../../store/reducers/search";
import { bindActionCreators } from "redux";
import { getSearchParam } from "../../services/url";
import { VideoList } from "../../components/VideoList/VideoList";
import { withRouter } from "react-router-dom";

class Search extends Component {
  componentDidMount() {
    if (!this.getSearchQuery()) {
      this.props.history.push("/");
    }
    this.searchForVideos();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.youtubeApiLoaded !== this.props.youtubeApiLoaded) {
      this.searchForVideos();
    }
  }

  render() {
    return (
      <VideoList
        bottomReachedCallback={this.buttomReachedCallback}
        showLoader={true}
        videos={this.props.searchResults}
      />
    );
  }
  bottomReachedCallback = () => {
    if (this.props.nextPageToken) {
      this.props.searchForVideos(
        this.getSearchQuery(),
        this.props.nextPageToken,
        25
      );
    }
  };
  searchForVideos() {
    const searchQuery = this.getSearchQuery();
    if (this.props.youtubeApiLoaded) {
      this.props.searchForVideos(searchQuery);
    }
    console.log(this.props.searchForVideos);
  }

  getSearchQuery() {
    console.log(this.props);
    return getSearchParam(this.props.location, "search_query");
  }
}

function mapStateToProps(state, props) {
  return {
    youtubeApiLoaded: getYoutubeLibraryLoaded(state),
    searchResults: getSearchResults(state, props.location.search),
    nextPageToken: getSearchNextPageToken(state, props.location.search)
  };
}

function mapDispatchToProps(dispatch) {
  const searchForVideos = searchActions.forVideos.request;
  return bindActionCreators({ searchForVideos }, dispatch);
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search)
);

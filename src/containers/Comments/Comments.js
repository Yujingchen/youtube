import React, { Component } from "react";
import CommentsHeader from "./CommentsHeader/CommentsHeader";
import AddComments from "./AddComment/AddComment";
import Comment from "./Comment/Comment";
export default class Comments extends Component {
  render() {
    return (
      <div>
        <CommentsHeader amountComments={this.props.amountComments} />
        <AddComments />
        <Comment />
        <Comment />
        <Comment />
      </div>
    );
  }
}

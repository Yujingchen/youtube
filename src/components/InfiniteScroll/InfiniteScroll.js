import React from "react";
import Waypoint from "react-waypoint";
import { Loader } from "semantic-ui-react";
export default function InfiniteScroll(props) {
  return (
    <React.Fragment>
      {props.children}

      <Waypoint onEnter={props.bottomReachedCallback}>
        <div className="load-container">
          <Loader active={props.showLoader} inline="centered" />
        </div>
      </Waypoint>
    </React.Fragment>
  );
}

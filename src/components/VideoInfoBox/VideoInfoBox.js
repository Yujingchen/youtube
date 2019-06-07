import React, { Component } from "react";
import "./VideoInfoBox.scss";
import { Image, Button, Divider } from "semantic-ui-react";

class VideoInfoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
  }

  onToggleCollapseButtonClick = () => {
    this.setState(prevState => {
      return {
        collapsed: !prevState.collapsed
      };
    });
  };

  render() {
    let descriptionTextClass = "collapsed";
    let buttonTitle = "Show More";
    if (!this.state.collapsed) {
      descriptionTextClass = "expanded";
      buttonTitle = "Show Less";
    }

    return (
      <div>
        <div className="video-info-box">
          <Image
            className="channel-image"
            src="http://via.placeholder.com/48x48"
            circular
          />
          <div className="video-info">
            <div className="channel-name"> Channel Name</div>
            <div className="video-publication-date">Thu 24, 2017</div>
          </div>

          <Button color="youtube" className="subscribe">
            91.5K Subscribe
          </Button>

          <div className="video-description">
            <div className={descriptionTextClass}>
              <p>p1</p>
              <p>p2</p>
              <p>p3</p>
              <p>p4</p>
              <p>p5</p>
            </div>
            <Button onClick={this.onToggleCollapseButtonClick} compact>
              {buttonTitle}
            </Button>
          </div>
        </div>
        <Divider />
      </div>
    );
  }
}

export default VideoInfoBox;

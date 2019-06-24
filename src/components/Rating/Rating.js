import React from "react";
import "./Rating.scss";
import { Icon, Progress } from "semantic-ui-react";
import { getShortNumberString } from "../../services/number/number-format";
export default function Rating(props) {
  let rating = null;
  let likeCount = props.likeCount !== 0 ? props.likeCount : null;
  let dislikeCount = null;

  if (props.likeCount && props.dislikeCount) {
    const amountLikes = parseFloat(props.likeCount);
    const amountDislikes = parseFloat(props.dislikeCount);
    const percentagePositiveRatings =
      100.0 * (amountLikes / (amountLikes + amountDislikes));
    likeCount = getShortNumberString(amountLikes);
    dislikeCount = getShortNumberString(amountDislikes);
    rating = (
      <Progress
        className="progress"
        percent={percentagePositiveRatings}
        size="tiny"
      />
    );
  }
  return (
    <div className="rating">
      <div className="thumbs-up">
        <Icon name="thumbs up" />
        <span>{likeCount}</span>
      </div>
      <div className="thumbs-down">
        <Icon name="thumbs down" />
        <span>{dislikeCount}</span>
      </div>
      {rating}
    </div>
  );
}

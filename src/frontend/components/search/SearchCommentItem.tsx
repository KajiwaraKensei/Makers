// ______________________________________________________
// コメントの表示

import React from "react";
import * as Next from "next";
import styled from "styled-components";
import { Typography, Avatar, ListItem, ListItemText, ListItemAvatar } from "@material-ui/core";
import { comment } from "../../store/search";

// ______________________________________________________
// 型定義

type Props = {
  comment: comment;  // 表示するコメント
  className?: string;
}

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const { comment } = props;
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={comment.contributor.name} />
      </ListItemAvatar>
      <ListItemText
        style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}
        primary={<React.Fragment>
          <Typography
            component="span"
            variant="body1"
            style={{ display: "inline" }}
            color="textPrimary"
          >
            {comment.contributor.name}
          </Typography>
          <Typography
            component="span"
            style={{ display: "inline", color: "#777", fontSize: ".9rem" }}
          >
            {` — ${comment.date}`}
          </Typography>

        </React.Fragment>
        }
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              style={{ display: "inline" }}
              color="textPrimary"
            >
              {comment.value}
            </Typography>

          </React.Fragment>
        }
      />
    </ListItem>
  );
};

// ______________________________________________________
// スタイル

const StyledComponent = styled(Component)`
`;

export default StyledComponent;
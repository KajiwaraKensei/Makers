// ______________________________________________________
// コメントを並べて表示する

import React from "react";
import * as Next from "next";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import { comment } from "~/store/search";
import { loading } from "~/store/loading";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { List, Typography } from '@material-ui/core';
import { Divider, CircularProgress } from '@material-ui/core';
import { SearchCommentItem, SearchCommentForm } from ".";

// ______________________________________________________
// 型定義

type StateProps = {
  comments: comment[];
  commentsLength: number;
  loading: loading;
};

type Props = {
  className?: string;
};
const selector = (state: RootState): StateProps => ({
  comments: state.search.comments,
  commentsLength: state.search.commentLength,
  loading: state.loading.comment
});

// ______________________________________________________
// コンポーネンと

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const state = useSelector(selector);
  const { comments, commentsLength, loading } = state;
  const classes = useStyles({});

  return (
    <div className={props.className} >
      {
        loading.state ? <div className="progress"><CircularProgress /></div>
          : loading.err ? loading.errorMessage
            :
            <>
              <Typography >コメント数 {commentsLength}件</Typography>
              <SearchCommentForm />
              <List className={classes.root}>
                {comments.map((comment, i) => (
                  <div key={"temp_comment_" + i}>
                    <SearchCommentItem {...{ comment }} />
                    {i !== comments.length - 1 && <Divider variant="inset" component="li" />}
                  </div>
                ))}
              </List>
            </>
      }
    </div>
  )
}

// ______________________________________________________
// スタイル

const StyledComponent = styled(Component)`
  width: 100%;
`;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    }
  }),
);

export default StyledComponent;
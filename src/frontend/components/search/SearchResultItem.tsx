// ______________________________________________________
// 検索結果の表示

import React from "react";
import * as Next from "next";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import { searchItem } from "~/store/search";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Chip, Grid, Divider, Typography, Paper } from '@material-ui/core';

// ______________________________________________________
// 型定義

type Props = {
  className?: string;
  article: searchItem;
  id: number;
  onClick?: (id: number) => void;
}

const selector = (state: RootState) => state.search.select;

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const select = useSelector(selector);
  const { article, onClick, id } = props;
  const classes = useStyles({});
  const { date, title, author, tags, fav, executionCount, memo, comments } = article;
  const doClick = () => {
    onClick(props.id);
  };
  return (
    <div className={props.className} onClick={doClick} {...(id === select) && { style: { paddingTop: "2rem", paddingBottom: "2rem" } }} >
      <Paper elevation={id === select ? 15 : 3} style={{ position: "relative", padding: ".3rem" }}>
        <div className={classes.section1}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h5">
                {title}
              </Typography>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
          {memo && <Typography color="textSecondary" variant="body2">
            {memo}
          </Typography>}
        </div>
        <Divider variant="middle" />
        <div className={classes.section2}>
          <div>
            {tags.map((tag, i) => (
              <Chip className={classes.chip} color="primary" label={tag} key={"search_item_" + i} />
            ))}
          </div>
          <div className="article_contents">
            <p><i className="far fa-edit" />{author.name}</p>
            <p><i className="fas fa-play"></i>{executionCount}</p>
            <p><i className="fas  fa-comment-alt"></i>{comments}</p>
            <p><i className="fas fa-hourglass-half" />{date}</p>
          </div>
        </div>
      </Paper>
    </div>
  );
};

// ______________________________________________________
// スタイル

const StyledComponent = styled(Component)`
  font-family: inherit;
  padding: .5rem 1.5rem;
  transition:all .1s  ease-in;
  &  .article_contents{
    display: flex;
    flex-wrap: wrap;
    font-size: .85rem;
      & > p{
      color: #888;
      padding: .0rem .5rem;
      line-height: 1rem;
      height: 1.5rem;
      margin-bottom: 0;
      & > i{
        padding-right: .3rem;
      }
    }
  }
  .search_item_tags{
    display: flex;
    flex-wrap: wrap;
    border-radius: .5rem;
    padding: .2rem;
    font-size: .75rem;
    & > span{
    background-color: #fff;
    border: 1px solid #aaa;

    font-weight: bold;
    color: #aaa;
      border-radius: .8rem;
      padding: .3rem .6rem;
      margin: .3rem .35rem;
      &:hover{
        cursor:pointer;
      }
    }
  }
  &:hover{
    cursor: pointer;
  }
`;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      marginRight: theme.spacing(1),
    },
    section1: {
      margin: theme.spacing(3, 2),
    },
    section2: {
      margin: theme.spacing(2),
    },
  }),
);

export default StyledComponent;
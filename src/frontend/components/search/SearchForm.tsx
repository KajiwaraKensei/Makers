// ______________________________________________________
// 検索フォーム

import React from "react";
import * as Next from "next";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState, actionCreator } from "~/store";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Paper, Typography, Button, TextField, Select } from "@material-ui/core"
import { MenuItem, InputLabel, FormControl } from '@material-ui/core';

// ______________________________________________________
// 型定義


type StateProps = {
  sort: number;
  order: number;
  searchWord: string; //検索ワード
}

type Props = {
  className?: string;
}
const selector = (state: RootState): StateProps => ({
  sort: state.search.sort,
  order: state.search.order,
  searchWord: state.search.searchWord,
});

// ______________________________________________________
// コンポーネンと

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const classes = useStyles({});
  const state = useSelector(selector);
  const { searchWord, sort, order } = state;
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as number
    if (value === 0 || value === 1 || value === 2) {
      dispatch(actionCreator.search.changeSort(value));
    };
  };
  const orderHandleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as number;
    if (value === 1 || value === -1) {
      dispatch(actionCreator.search.changeOrder(value));
    };
  };
  const doSearchWordChange = (e: any) => {
    const nextWord = e.target.value;
    dispatch(actionCreator.search.changeSearchWord(nextWord));
  };
  const doSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(actionCreator.search.doSearch());
  };

  return (
    <div className={props.className} >
      <Paper elevation={3} style={{ position: "relative", padding: ".5rem .3rem" }}>
        <Typography variant="h5" style={{ padding: ".5rem" }}>検索</Typography>
        <form onSubmit={doSearch}>
          <div className="top_group">
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">ソート</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                onChange={handleChange}
              >
                <MenuItem value={0}>日付</MenuItem>
                <MenuItem value={2}>実行数</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">表示</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={order}
                onChange={orderHandleChange}
              >
                <MenuItem value={1}>昇順</MenuItem>
                <MenuItem value={-1}>降順</MenuItem>
              </Select>
            </FormControl>
          </div>
          <TextField
            id="standard-full-width"
            style={{ margin: 8 }}
            placeholder="search"
            helperText="タグは先頭に#"
            fullWidth
            margin="normal"
            label="キーワード検索"
            className={classes.searchWord}
            value={searchWord}
            onChange={doSearchWordChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="search_submit_button"
          >検索</Button>
        </form>
      </Paper>
    </div>
  );
};

// ______________________________________________________
//　スタイル

const StyledComponent = styled(Component)`
  width: 100%;
  padding: 1.5rem 1.5rem .5rem;
  & > * > .top_group{
    display: flex;
    flex-wrap: wrap;
    & > *{
      flex-grow: 2;
    }
  }
  .search_submit_button{
    margin: 0 1rem 0 auto;
    display: block;
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    searchWord: {
      width: "95%",
    }
  }),
);

export default StyledComponent;


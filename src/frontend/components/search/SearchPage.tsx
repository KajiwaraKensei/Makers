// ______________________________________________________
// 検索ページ

import React from "react";
import * as Next from "next";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState, actionCreator } from "~/store";
import { SearchForm, SearchResultList, SearchPreview } from ".";
import { searchItem } from "~/store/search";
import { Typography, Button } from "@material-ui/core";

// ______________________________________________________
// 型定義


type StateProps = {
  result: searchItem[];
  select: number;
  windowSize: number;
  breakPoint: number;
};
type Props = {};
const selector = (state: RootState): StateProps => ({
  result: state.search.result,
  select: state.search.select,
  windowSize: state.window.width,
  breakPoint: state.window.breakPoint
});

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const dispatch = useDispatch();
  const state = useSelector(selector);
  const { result, select, windowSize, breakPoint } = state;
  const [toggle, setToggle] = React.useState(false);
  const closeAction = () => setToggle(false);
  const openAction = () => setToggle(true);
  const noSelect = (
    <div className="result_no_select">
      <Typography>
        {windowSize < breakPoint && <Button onClick={closeAction}>戻る</Button>}
        選択されていません
      </Typography>
    </div>
  );

  const changeSelect = (select: number) => {
    openAction()
    dispatch(actionCreator.search.changeSelect(select))
    dispatch(actionCreator.search.getComments(select))
  };

  const doScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    const scrollHeight = event.currentTarget.scrollHeight;
    const offsetHeight = event.currentTarget.offsetHeight;
    const resultHeight = scrollHeight - (scrollTop + offsetHeight);
    if (resultHeight < 50) {
      dispatch(actionCreator.search.addDoSearch());
    }
  };

  return (
    <StyledComponent type={windowSize > breakPoint} toggle={toggle} >
      <div className="search_left" onScroll={doScroll}>
        <SearchForm />
        <SearchResultList changeSelect={changeSelect} />
      </div>
      <div className="search_right">
        {result[select] ? <SearchPreview closeAction={closeAction} result={result[select]} /> : noSelect}
      </div>
    </StyledComponent>
  );
};

// ______________________________________________________
// スタイル
interface StyleProps {
  type: boolean;
  toggle: boolean;
};
const StyledComponent = styled.div<StyleProps>`
  width: 100%;
  height: 100%;
  display: flex;
  & .result_no_select{
    text-align: center;
    padding: 2rem;
    color: #ccc;
    font-size: .8rem
  }
  ${props => props.type ? `
  & > .search_right{
    transition:all .2s .1s ease-in;
    width: 65%;
    height: 100%;
    overflow: scroll;
  }
  & > .search_left{
    transition:all .2s .1s ease-in;
    width: 35%;
    height: 100%;
    overflow: scroll;
  }
  ` : `
  position: relative;
  ${props.toggle ? `
  & > .search_left{
    left: -100%;
    right: 100%;

  }
  & > .search_right{
    left: 0;
    right: 0;
  }
  ` : `
  & > .search_left{
    left: 0;
    right: 0;
  }
  & > .search_right{
    left: 100%;
    right: -100%;

  }
    `}
  & > .search_left, & > .search_right{
    transition:all .2s .1s ease-in;
    flex: 0 0 100%;
    height: 100%;
    overflow: scroll;
    position: absolute;
    top: 0;
  }
  overflow: hidden;
  `}
`;

export default Component;
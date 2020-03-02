// ______________________________________________________
// 検索結果をリストで表示

import React from "react";
import * as Next from "next";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState, actionCreator } from "~/store";
import { searchItem } from "~/store/search";
import { loading } from "~/store/loading";
import { SearchResultItem } from ".";
import { CircularProgress } from '@material-ui/core';

// ______________________________________________________
// 型定義

type StateProps = {
  result: searchItem[];
  loading: loading;
};
type Props = {
  className?: string;
  changeSelect: (select: number) => void;
};

const selector = (state: RootState): StateProps => ({
  result: state.search.result,
  loading: state.loading.search
});

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const state = useSelector(selector);
  const { result, loading } = state;
  const dispatch = useDispatch();
  const resultRef = React.createRef<HTMLDivElement>();
  React.useEffect(() => {
    if (loading.state === null) {
      dispatch(actionCreator.search.doSearch());
    };
  }, []);

  return (
    <div className={props.className} >
      {
        loading.state ? <div className="progress"><CircularProgress /></div>
          : loading.err ? loading.errorMessage
            :
            <div ref={resultRef}>
              {result.map((article, i) => (
                <div key={"card-d_" + i}>
                  <SearchResultItem article={article} id={i} onClick={props.changeSelect} />
                </div>
              ))}
              {result.length <= 0 && "見つかりませんでした"}
            </div>
      }
    </div>
  );
};

// ______________________________________________________
// スタイル

const StyledComponent = styled(Component)`
  width: 100%;
  & .progress{
    padding: 2rem;
    text-align: center;
  }
`;

export default StyledComponent;
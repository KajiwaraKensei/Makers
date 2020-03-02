// ______________________________________________________
// 作ったテンプレートをリスト表示

import React from "react";
import * as Next from "next";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import { SelfMadeTemplateIte } from ".";
import { Typography } from "@material-ui/core";

// ______________________________________________________
// 型定義

type Props = {
  userName: string;
}
const selector = (state: RootState) => ({
  selfMadeTemplates: state.account.selfMadeTemplates,
  loading: state.loading.account,
  selfLoading: state.loading.search
});

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const state = useSelector(selector);
  const { selfMadeTemplates, loading, selfLoading } = state;

  const [select, setSelect] = React.useState(-1);

  const deploymentSelfMadeTemplates = selfMadeTemplates.map((selfMadeTemplate, i) => (
    <SelfMadeTemplateIte selfMadeTemplate={selfMadeTemplate} key={selfMadeTemplate.id} select={select === i} onClick={() => setSelect(i)} />
  ));
  return (
    <StyledComponent>
      {loading.state ? "通信中" : loading.err ? loading.errorMessage :
        <>
          {
            selfLoading.state ? "通信中" : selfLoading.err ? selfLoading.errorMessage :
              <>
                <Typography className="my_page_title" variant="h5">{props.userName}さんの作品一覧</Typography>
                <div className="my_page_content">
                  {deploymentSelfMadeTemplates}
                </div>
                {selfMadeTemplates.length === 0 && "まだありません"}
              </>
          }
        </>
      }
    </StyledComponent>
  );
};

// ______________________________________________________
// スタイル

const StyledComponent = styled.div`
  width: 100%;
  height: 100%;
  .my_page_title{
    text-align: center;
    padding: 2rem 1rem 0;
    color: #89c;
  }
  & .my_page_content{
    width: 100%;
    padding: 2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
    transition:all .2s ease-in;

  }
`;

// ______________________________________________________
//

export default Component;
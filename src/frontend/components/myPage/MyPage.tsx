// ______________________________________________________
// マイページ

import React from "react";
import * as Next from "next";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState, actionCreator } from "~/store";
import { SelfMadeTemplateList } from ".";
import LoginForm from "~/components/account/LoginForm";

// ______________________________________________________
// 型定義

type Props = {};
const selector = (state: RootState) => ({
  login: state.account.login,
  userName: state.account.userName
});

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const dispatch = useDispatch();
  const state = useSelector(selector);
  React.useEffect(() => {
    if (state.login) {
      dispatch(actionCreator.account.getUserInfo())
    }
  }, [state.login]);

  return (
    <StyledComponent >
      {state.login ?
        <SelfMadeTemplateList userName={state.userName} />
        :
        <div className="my_page_guest">
          <h3>ログインしてください</h3>
          <LoginForm />
        </div>
      }
    </StyledComponent>
  )
};

// ______________________________________________________
// スタイル

const StyledComponent = styled.div`
   .my_page_guest{
     text-align: center;
   }
`;

export default Component;
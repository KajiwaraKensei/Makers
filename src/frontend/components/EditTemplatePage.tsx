// ______________________________________________________
//

import React from "react";
import * as Next from "next";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import TemplatePage from "~/components/template/TemplatePage";
import { loading } from "~/store/loading";
import { question, } from "~/store/questions";

// ______________________________________________________
// 型定義

type StateProps = {
  loading: loading;
  questions: question[];
  editString: string;
  windowWidth: number;
  breakPoint: number;
};

type Props = {};
const selector = (state: RootState): StateProps => ({
  loading: state.loading.template,
  questions: state.questions.questions,
  editString: state.template.editString,
  windowWidth: state.window.width,
  breakPoint: state.window.breakPoint
});

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props) => {
  const state = useSelector(selector)
  const { loading, editString, questions, breakPoint, windowWidth } = state

  return (
    <StyledComponent type1={breakPoint < windowWidth} >
      {loading.state === true ?
        "通信中"
        : loading.err === true ?
          "通信エラー: " + loading.errorMessage
          :
          <>
            <div className="left_page">
              <TemplatePage {...{ editString, questions }} />
            </div>
            <div className="right_page">
            </div>
          </>
      }
    </StyledComponent>
  )
}

// ______________________________________________________
// スタイル
interface StyledComponentProps {
  type1?: boolean
}
const StyledComponent = styled.div<StyledComponentProps>`
width: 100%;
height: 100%;
display: flex;
border-top: 1px solid #ccc;
& > .left_page{
  width: 100%;
  overflow: scroll;
}
& > .right_page{
  ${props => props.type1 && `display: none;`}
  height: 100%;
  overflow: scroll;
}
`

export default Component;
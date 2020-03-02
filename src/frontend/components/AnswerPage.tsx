import React from "react";
import * as Next from "next";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import Answer from "~/components/answer/AnswerPage";

// ______________________________________________________
//

type Props = {
  className?: string;
};

const selector = (state: RootState) => ({
  windowWidth: state.window.width,
  breakPoint: state.window.breakPoint,
  loading: state.loading.template
});

// ______________________________________________________
//

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const state = useSelector(selector);
  const { windowWidth, breakPoint } = state;
  return (
    <div className={props.className} >
      {state.loading.state === null ?
        "準備中"
        : state.loading.state === true ?
          "通信中"
          : state.loading.err === true ?
            "通信エラー"
            :
            <Answer type={breakPoint < windowWidth} />
      }
    </div>
  );
};

// ______________________________________________________
//

const StyledComponent = styled(Component)`
  width: 100%;
  height: 100%;
`;

export default StyledComponent;
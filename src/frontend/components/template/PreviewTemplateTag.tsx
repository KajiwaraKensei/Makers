// ______________________________________________________
//

import React from "react"
import * as Next from "next"
import styled from "styled-components"
import { connect } from "react-redux"
import { RootState } from "../../store"
import { ThunkDispatch } from "redux-thunk"
import { question, searchQuestionById } from "../../store/questions"

// ______________________________________________________
// 型定義

type OuterProps = {
  clickAction?: (questionId: number) => void;
  questionId: number
  questions: question[]
}
type StateProps = {
  className?: string;

}
type DispatchProps = {
}
type Props = StateProps & DispatchProps & OuterProps

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const { questions, clickAction, questionId } = props
  const question = searchQuestionById(questions, questionId)

  return (
    <button style={{ margin: "0 .25rem" }} className={props.className} onClick={() => question !== null && clickAction(question.id)}>
      {question !== null ? question.label : "undefined"}
    </button>
  )
}

// ______________________________________________________
// スタイル

const StyledComponent = styled(Component)`
  line-height: 1.45rem;
  background-color: #fff;
  border-radius: .2rem;
  display: inline-block;
  margin: 0 .3rem;
  padding: .1rem .5rem;
  font-size: .85rem;
`

// ______________________________________________________
//

const mapStateToProps = (
  state: RootState,
  _ownProps: OuterProps
): StateProps => ({

})

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, undefined, any>,
  _ownProps: OuterProps
): DispatchProps => ({
});

export default connect<StateProps, DispatchProps, OuterProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(StyledComponent);
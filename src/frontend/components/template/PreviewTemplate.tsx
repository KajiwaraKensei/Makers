// ______________________________________________________
// 

import React from "react"
import * as Next from "next"
import styled from "styled-components"
import { connect } from "react-redux"
import { RootState } from "../../store"
import { ThunkDispatch } from "redux-thunk"
import { PreviewTemplate, PreviewTemplateTag } from "."
import { templateContents, areasType } from "../../store/template"
import { setQuestionForm } from "../../store/questions/thunkActions"
import { question } from "../../store/questions"
import { Paper, Typography } from "@material-ui/core"

// ______________________________________________________
// 型定義

type OuterProps = {
  templateContents: templateContents[]
  areas: areasType;
  questions: question[]
}
type StateProps = {
  className?: string;
}
type DispatchProps = {
  clickQuestion: (questionId: number) => void
}
type Props = StateProps & DispatchProps & OuterProps

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const { templateContents, areas, questions, clickQuestion } = props

  return (
    <span className={props.className} >
      {
        templateContents.map((content, i) => {
          switch (content.type) {
            case "normal":
              return <Typography key={"new-temp-" + i} display="inline" style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}
              >{content.value}</Typography>
            case "newLine":
              return <br key={"new-temp-" + i} />
            case "tag":
              return <PreviewTemplateTag
                key={"new-temp-" + i}
                questionId={content.value}
                clickAction={clickQuestion}
                questions={questions}
              />
            case "area":
              return <Paper variant="outlined"
                className="template_area_tag"
                key={"new-temp-" + i}
                elevation={10}
                onClick={(e) => {
                  e.stopPropagation()
                  clickQuestion(questions[areas[content.value].questionId].id)
                }}
              >
                <span style={{ fontSize: ".7rem", color: "#888" }}>{questions[areas[content.value].questionId].label}：{questions[areas[content.value].questionId].childElements[areas[content.value].branchId].asking}：</span>
                <PreviewTemplate
                  areas={areas}
                  templateContents={areas[content.value].contents}
                  questions={questions}
                />
              </Paper>
          }
          return <></>
        })
      }
    </span>
  )
}

// ______________________________________________________
// スタイル

interface StyledComponentProps {
  width?: string | number;
  height?: string | number;
}
const StyledComponent = styled(Component) <StyledComponentProps>`
  width: ${props => props.width};
  height: ${props => props.height};
  & .template_area_tag{
    display: inline-block;
    margin: 0;
    padding: .1rem;
    max-width: 100%;
    &:hover{
    cursor: pointer
    }
  }
`
StyledComponent.defaultProps = {
  width: "100%",
  height: "3rem;"
}

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
  clickQuestion: (questionId: number) => {
    dispatch(setQuestionForm(questionId))
  }
});

export default connect<StateProps, DispatchProps, OuterProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(StyledComponent);
// ______________________________________________________
//  テンプレートの文字を入れる

import React from "react"
import * as Next from "next"
import styled from "styled-components"
import { connect } from "react-redux"
import { RootState } from "../../store"
import { ThunkDispatch } from "redux-thunk"
import * as templateActionCreator from "../../store/template/actions"
import { Button, ButtonGroup, TextareaAutosize, FormControlLabel, Switch } from "@material-ui/core"
import { question } from "../../store/questions"

// ______________________________________________________
// 型定義

type OuterProps = {
}
type StateProps = {
  className?: string;
  editString: string;
  questions: question[]
}
type DispatchProps = {
  changeEditString: (nextWord: string) => void
}
type Props = StateProps & DispatchProps & OuterProps

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const { questions, editString, changeEditString } = props
  const [sameWordToggle, setSameWordToggle] = React.useState<boolean>(true)


  // タグの文字を入れる
  const addTagString = (number: number, child?: number) => {
    if (myInput.current) {
      const start = myInput.current.selectionStart;
      const end = myInput.current.selectionEnd;
      let before = editString.slice(0, start);
      let after = editString.slice(end);
      const select = editString.slice(start, end)
      const question = questions[number]
      if (question.type === "normal") {
        const tag = `{#${question.label}}`
        if (sameWordToggle && select.length > 2) {
          before = before.replace(new RegExp(select, "g"), tag)
          after = after.replace(new RegExp(select, "g"), tag)
        }
        changeEditString(before + tag + after);
      } else if (question.type === "branch") {
        if (child !== undefined) {
          const tag = `{${question.label}|#${question.childElements[child].id}{${select}}}`;
          if (sameWordToggle && select.length > 2) {
            before = before.replace(new RegExp(select, "g"), tag)
            after = after.replace(new RegExp(select, "g"), tag)
          }
          changeEditString(before + tag + after);
        }
      }
      myInput.current.focus()
    }
  }

  const myInput = React.createRef<HTMLTextAreaElement>();

  const doChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const nextWord = e.target.value;
    changeEditString(nextWord);
  }
  const insertArea = (
    <div className="insert_buttons">
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button className="insert_label"  >質問タグ</Button>
        {questions.map(((question, i) => (
          question.type === "normal" &&
          <Button
            key={"insert_button_ " + question.id}
            onClick={() => addTagString(i)}>
            {question.label}
          </Button>

        )))}
      </ButtonGroup>
      <ButtonGroup size="small" aria-label="small outlined group">
        <Button className="insert_label"  >選択タグ</Button>
        {questions.map(((question, i) => (
          question.type === "branch" &&
          question.childElements.map((child, j) => (
            <Button
              key={"insert_button_ branch_" + child.id + j}
              onClick={() => addTagString(i, j)}>
              {question.label}:{child.asking}
            </Button>))
        )))}
      </ButtonGroup>
      <FormControlLabel
        control={
          <Switch
            checked={sameWordToggle}
            onChange={(e, checked) => setSameWordToggle(checked)}
            value="checkedB"
            color="primary"
          />
        }
        label="同じ文字を変換"
      />
    </div>
  )

  return (
    <div className={props.className} >
      {insertArea}
      <TextareaAutosize
        className="edit_template_input"
        rowsMin={5}
        ref={myInput}
        value={editString}
        placeholder="文字を入力"
        onChange={doChange}
      />
    </div>
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
  padding: 1rem;  
  .edit_template_input{
    display: block;
    margin: 1rem auto;
    padding: .5rem;
    font-size: .9rem;
    width: 100%;
    max-width: 50rem;
    border: 1px solid #ddd;
    border-radius: .3rem;
  }
  .insert_label{
    color: #fff;
    background-color: #555;
    pointer-events: none;
  }
  .insert_buttons{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: space-between;
    & > *{
      padding: 0 0 .5rem;
    }
  }
`
StyledComponent.defaultProps = {
  width: "100%",
  height: "100%"
}
const Styles = styled.div`
flex-direction: column;
`

// ______________________________________________________
//

const mapStateToProps = (
  state: RootState,
  _ownProps: OuterProps
): StateProps => ({
  questions: state.questions.questions,
  editString: state.template.editString
})

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, undefined, any>,
  _ownProps: OuterProps
): DispatchProps => ({
  changeEditString: (nextWord: string) => {
    dispatch(templateActionCreator.setEditString(nextWord))
  }
});

export default connect<StateProps, DispatchProps, OuterProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(StyledComponent);
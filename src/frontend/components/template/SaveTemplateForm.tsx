// ______________________________________________________
// テンプレートの保存を押された時に表示される

import React from "react"
import * as Next from "next"
import styled from "styled-components"
import { connect } from "react-redux"
import { RootState } from "../../store"
import { ThunkDispatch } from "redux-thunk"
import Dialog from "../Dialog"
import * as templateActionCreator from "../../store/template/actions"
import { doAdd, doSave } from "../../store/template/thunkAction"
import { FormInput, formInputProps } from "../question/QuestionForm"
import { useRouter } from "next/router"

// ______________________________________________________
// 型定義

type OuterProps = {
  children?: React.ReactNode
}
type StateProps = {
  className?: string;
  login: boolean;
  title: string;
}
type DispatchProps = {
  changeTitle: (nextTitle: string) => void;
  doSave: (templateId: string) => void;
  doAdd: () => void
}
type Props = StateProps & DispatchProps & OuterProps

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const router = useRouter()
  const { children, login, changeTitle, doAdd, doSave } = props
  const [toggle, setToggle] = React.useState(false)

  const handleClose = () => { setToggle(false) };

  const handleOpen = () => {
    if (!login) {
      alert("ログインする必要があります")
      return
    }
    setToggle(true)
  };

  const submitForm = () => {
    if (router.route === "/template/[templateId]") {
      const id = router.query.templateId
      if (typeof id === "string") {
        doSave(id)
      }
    } else {
      doAdd()
    }
  }
  const dialogProps = {
    toggle,
    closeForm: handleClose,
    submitAction: submitForm,
    title: "テンプレート保存",
    submitText: "保存"
  }
  return (
    <>
      {
        toggle &&
        <Dialog {...dialogProps}>
          <div className={props.className} >
            <FormInput
              {...formInputProps(
                "タイトル",
                props.title,
                changeTitle,
                false
              )}
            />
          </div>
        </Dialog>
      }
      <span onClick={handleOpen}>{children}</span>
    </>
  )
}

// ______________________________________________________
// スタイル

const StyledComponent = styled(Component)`
`

// ______________________________________________________
//

const mapStateToProps = (
  state: RootState,
  _ownProps: OuterProps
): StateProps => ({
  login: state.account.login,
  title: state.template.title
})

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, undefined, any>,
  _ownProps: OuterProps
): DispatchProps => ({
  changeTitle: (nextTitle: string) => {
    dispatch(templateActionCreator.setTemplateTitle(nextTitle))
  },
  doSave: (templateId: string) => {
    dispatch(doSave(templateId))
  },
  doAdd: () => {
    dispatch(doAdd())
  },

});

export default connect<StateProps, DispatchProps, OuterProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(StyledComponent);

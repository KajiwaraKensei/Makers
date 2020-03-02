// ______________________________________________________
//  ダイアログ

import React from "react"
import * as Next from "next"
import styled from "styled-components"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// ______________________________________________________
// 型定義


type Props = {
  closeForm: () => void;  //閉じたときの処理
  submitAction: () => void  // 決定を押したときの処理
  toggle: boolean;
  children?: React.ReactNode // ダイアログに表示したいもの

  // タイトルやボタンの文字を指定
  title?: string
  submitText?: string
  cancelString?: string
}

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props) => {
  const { toggle, closeForm, submitAction, title, submitText, cancelString } = props

  const handleClose = () => {
    closeForm()
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (toggle) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [toggle]);

  const doSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    submitAction()
  }

  return (
    <StyledComponent>
      <Dialog
        fullWidth
        open={toggle}
        className="body_fo"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <form>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            {props.children}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {cancelString || "キャンセル"}
            </Button>
            <Button type="submit" onClick={doSubmit} color="primary">
              {submitText || "OK"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </StyledComponent>
  )
}

// ______________________________________________________
// スタイル

const StyledComponent = styled.div`
  & > .body_fd{
    background-color: #fff;
  }
`

export default Component

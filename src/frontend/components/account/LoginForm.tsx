import React from "react";
import * as Next from "next";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Dialog from "~/components/Dialog";
import Button from '@material-ui/core/Button';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { FormInput } from "./SignUpForm";
import { actionCreator } from "~/store";

// ______________________________________________________
// 型定義

type Props = {
  className?: string;
  children?: React.ReactNode
}

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const { children } = props
  const [toggle, setToggle] = React.useState(false);
  const [mail, setMail] = React.useState("");
  const [pass, setPass] = React.useState("");

  const dispatch = useDispatch();
  const closeLoginForm = () => {
    setToggle(false)
  }
  const openLoginForm = () => {
    setToggle(true)
  }
  const submitAction = () => {
    dispatch(actionCreator.account.doLogin({ email: mail, password: pass }))
  }
  return (
    <>
      {
        children ?
          <span onClick={openLoginForm}>{children} </span>
          :
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<MeetingRoomIcon />}
            onClick={openLoginForm}
          >
            login
          </Button>
      }
      {
        toggle &&
        <Dialog
          toggle={toggle}
          closeForm={closeLoginForm}
          submitAction={submitAction}
          title="ログイン"
          submitText="ログイン"
        >
          <div className={props.className} >
            <FormInput
              type="email"
              label="e-mail"
              doChange={setMail}
              value={mail}
            />
            <FormInput
              type="password"
              label="password"
              doChange={setPass}
              value={pass}
            />
          </div>
        </Dialog>
      }
    </>
  )
}

// ______________________________________________________
// スタイル

const StyledComponent = styled(Component)`
& > * {
  margin: .0rem 0 1rem;
  &:last-child{
    margin: 0;
  }
}
`

export default StyledComponent
import React from "react";
import * as Next from "next";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Dialog from "~/components/Dialog";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { actionCreator } from "~/store";

// ______________________________________________________
//

type Props = {
  className?: string;
  children?: React.ReactNode;

}

// ______________________________________________________
//

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const { children } = props;
  const dispatch = useDispatch();
  const [toggle, setToggle] = React.useState(false);
  const [email, setEmail] = React.useState<string>("");
  const [userName, setName] = React.useState("");
  const [password, setPass] = React.useState("");
  const closeLoginForm = () => {
    setToggle(false);
  }
  const openLoginForm = () => {
    setToggle(true);
  }
  const submitAction = () => {
    dispatch(actionCreator.account.doSignIn({ email, userName, password }));
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
            アカウント作成
          </Button>
      }
      {
        toggle &&
        <Dialog
          toggle={toggle}
          closeForm={closeLoginForm}
          submitAction={submitAction}
          title="アカウント作成"
          submitText="作成"
        >
          <form onSubmit={submitAction}>
            <div className={props.className} >
              <FormInput
                type="email"
                label="e-mail"
                value={email}
                doChange={setEmail}
              />
              <FormInput
                label="名前"
                type="text"
                value={userName}
                doChange={setName}
              />
              <FormInput
                type="password"
                label="パスワード"
                value={password}
                doChange={setPass}
              />
            </div>
          </form>
        </Dialog>
      }
    </>
  )
}

// ______________________________________________________
//

interface InputProps {
  label?: string;
  value: string
  doChange: (st: string) => void;
  multiline?: boolean
  type?: string
}
export const FormInput = (props: InputProps) => {
  const { label, value, doChange, multiline, type } = props
  const doChangeString = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    doChange(e.target.value)
  }
  return (
    <StyledInput>
      <TextField
        type={type}
        style={{ width: "100%" }}
        label={label}
        value={value}
        onChange={doChangeString}
        variant="outlined"
        multiline={multiline}
        rowsMax={4}
      />
    </StyledInput>
  )
}
const StyledInput = styled.div`
      font-size: 0.9rem;
`
// ______________________________________________________
//
const StyledComponent = styled(Component)`
& > * {
  margin: .0rem 0 1rem;
  &:last-child{
    margin: 0;
  }
}
`

// ______________________________________________________
//


export default StyledComponent
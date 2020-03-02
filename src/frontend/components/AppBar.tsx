// ______________________________________________________
//  ナビゲーションバー

import React from "react";
import * as Next from "next";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState, actionCreator } from "~/store";
import LoginForm from "~/components/account/LoginForm";
import { useRouter } from "next/router"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from "@material-ui/icons/Add"
import { Button } from '@material-ui/core';
import Drawer from "./Drawer"
import { templateInit } from "~/store/template/actions"
import SignUpForm from "./account/SignUpForm"
import firebase from "firebase"
import { IconButton, Typography, Toolbar, MenuItem, Menu, Fab, InputAdornment, Input, AppBar } from "@material-ui/core"
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SaveTemplateForm from "./template/SaveTemplateForm";
import EventListener from 'react-event-listener';

// ______________________________________________________
// 型定義

type StateProps = {
  login: boolean
  userName: string
}

type Props = {};

const selector = (state: RootState): StateProps => ({
  login: state.account.login,
  userName: state.account.userName
});

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props) => {
  const classes = useStyles({});
  const state = useSelector(selector)
  const { login, userName } = state
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const dispatch = useDispatch();


  // ログインの確認
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(actionCreator.account.userLogin(user.displayName))
      }
    })
  }, [])
  React.useEffect(() => {
    dispatch(actionCreator.window.setWindowWidth(window.innerWidth))
  }, [])
  const handleResize = () => {
    dispatch(actionCreator.window.setWindowWidth(window.innerWidth))
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const doHome = () => {
    router.push("/")
  }
  const doLogout = () => {
    dispatch(actionCreator.account.doLogout())

    handleClose()
  }
  const yatLoginContent = (
    <>
      <LoginForm><Button color="inherit">ログイン</Button></LoginForm>
      <SignUpForm><Button color="inherit">サインイン</Button></SignUpForm>
    </>
  )
  const transitionNewTemplate = () => {
    dispatch(templateInit())
    router.push("/template")
  }
  const alreadyLoginContent = (
    <div>
      <Button
        aria-label="account of current user"
        aria-controls="menu-appbar"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />{userName}
      </Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={doLogout}>ログアウト</MenuItem>
      </Menu>
    </div>
  )

  const submitSearchWord = (searchWord: string) => {
    dispatch(actionCreator.search.changeSearchWord(searchWord))
    router.push("/search")
  }

  return (
    <StyledComponent>
      <EventListener target="window" onResize={handleResize} />
      <div>
        <AppBar position="static" >
          <Toolbar>
            <div className="humbugger_menu" >
              <Drawer>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
              </Drawer>
            </div>
            <div className="app_logo" onClick={doHome} >
              <div>
                <Typography variant="h6" className={classes.title}>
                  Makers
                </Typography>
              </div>
            </div>
            <div className="menu_list">
              <SearchButton callback={submitSearchWord} />
              <NewTemplateButton callback={transitionNewTemplate} />
              <MyPageButton />
            </div>

            {login ? alreadyLoginContent : yatLoginContent}
            <SaveButton />
          </Toolbar>
        </AppBar>
      </div>
      <div className="content">
        {props.children}
      </div>
    </StyledComponent >)
}

// ______________________________________________________
// スタイル

const StyledComponent = styled.div`
  & .app_logo {
    flex-grow: 1;
    & > div{
      width: 7rem;
      text-align: center;
      transition:all .3s  ease-in;
      padding: .2rem .8rem;
      border-radius: .2rem;
      &:hover{
        cursor: pointer;
        background-color: #eee;
      }
    }
  }
  
  display: flex;
  flex-direction: column;
  height: 100vh;
  z-index: 999;
  & .MuiButton-root{
    font-size: .75rem;

  }
  @media (min-width: 600px){
    .MuiToolbar-regular {
      min-height: 47px;
    }
  }
  & > .content{
    height: 100%;
    overflow: scroll;
    position: relative;
    background-color: #cccbcb38;
  }
  .MuiAppBar-colorPrimary{
    background-color: #fff;
    color: black;
  }
  .menu_list{
    display: flex;
    justify-content: center;
    align-items: center;
    & .MuiButton-root{
      font-size: .75rem;
    }
    & > *{
      margin: 0 .5rem;

    }
  }
  @media only screen and (max-width: 768px){
    .menu_list{
      display: none
    }

  } 
  @media only screen and (min-width: 768px){
    .humbugger_menu{
      display: none;
    }

  }
`
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
    },
  }),
);

const SaveButton = (props: {}) => {
  const router = useRouter()
  const doClick = () => {
    router.push("/template")
  }
  return (
    <>
      {
        router.asPath.indexOf("/template") !== -1 &&
        <SaveTemplateForm>
          <div style={{ padding: "0 .3rem", margin: "0 .4rem " }}>
            <Button color="secondary" variant="outlined">
              保存
        </Button>
          </div>
        </SaveTemplateForm>
      }
    </>
  )
}
// ______________________________________________________
// 検索バー

const SearchButton = (props: { callback: (searchWord: string) => void }) => {
  const ref = React.createRef<HTMLInputElement>()
  const [toggle, setToggle] = React.useState(false)
  const router = useRouter()

  const [st, setSt] = React.useState("")
  const changeString = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSt(event.target.value)
  }

  const doSubmit = (event: React.SyntheticEvent<any, Event>) => {
    event.preventDefault();
    props.callback(st)
    setSt("")
  }
  const doClick = () => {
    setToggle(true)
  }
  const onFocusFunc = () => {
    setToggle(true)
    ref.current.focus()
  }
  const onBlurFunc = () => {
    setToggle(false)
  }
  return (
    <>
      {
        router.asPath !== "/search" &&
        <SearchStyled toggle={toggle || st !== ""}>
          <span className="search_button">
            <Button onClick={doClick}>
              <SearchIcon />検索
            </Button>
          </span>
          <span className="search_button_deploy">
            {
              (toggle || st !== "") &&
              <form onSubmit={doSubmit}>
                <Input
                  inputRef={ref}
                  onMouseOver={onFocusFunc}
                  onFocus={onFocusFunc}
                  onBlur={onBlurFunc}
                  onChange={changeString}
                  value={st}
                  placeholder="検索"
                  autoFocus
                  endAdornment={
                    <InputAdornment onClick={doSubmit} position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </form>
            }
          </span>
        </SearchStyled>}
    </>
  )
}

// ______________________________________________________
// スタイル

interface searchProps {
  toggle: boolean

}
const SearchStyled = styled.div<searchProps>`

  display: flex;
  align-items: center;
  & .search_button{
    width: 5rem;
    & > *{
      width: 5rem;
    }
  }
  & .search_button_deploy{
    width: 15rem;
    transition: 0.3s ease-in-out;
   & .MuiInput-root{
      width: 100%;
    }
  }
  ${props => props.toggle ? `
    & .search_button{
      opacity: 0;
      width: 0;
    }`: `
    &  .search_button_deploy{
      visibility:hidden;
      width: 0;
      & .MuiInput-root{
        width: 0;
      }
    }`
  }  
`
const NewTemplateButton = (props: { callback: () => void }) => {
  const router = useRouter()

  return (
    <>
      {
        router.asPath !== "/template" &&
        <Button onClick={props.callback}>
          <AddIcon />新規作成
        </Button>
      }
    </>
  )
}
const MyPageButton = () => {
  const router = useRouter()
  const doClick = () => {
    router.push("/myPage")
  }
  return (
    <>
      {
        router.asPath !== "/myPage" &&
        <Button onClick={doClick}>
          <AccountBalanceWalletIcon />マイページ
      </Button>
      }
    </>
  )
}

export default Component;
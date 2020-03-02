// ______________________________________________________
//  

import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Search, AccountCircle, Add } from '@material-ui/icons';
import Link from 'next/link'
import { useRouter } from "next/router"

import React from "react"
import * as Next from "next"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { actionCreator } from "~/store"

// ______________________________________________________
// 型定義

type Props = {}

// ______________________________________________________
//

const useStyles = makeStyles({
  list: {
    width: 300,
  },
});
const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props) => {
  const classes = useStyles({});
  const [toggle, setToggle] = React.useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const transitionNewTemplate = () => {
    dispatch(actionCreator.template.templateInit());
    router.push("/template");
  };
  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setToggle(open);
  };
  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {[
          {
            text: 'マイページ', icon: <AccountCircle />,
            link: "/myPage"
          }, {
            text: '検索', icon: <Search />, link: "/search"
          },
        ].map((item) => (
          <Link href={item.link} key={item.text}>
            <ListItem button key={item.text}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <ListItem button onClick={transitionNewTemplate} >
        <ListItemIcon><Add /></ListItemIcon>
        <ListItemText primary="新規テンプレート作成" />
      </ListItem>
    </div>
  );

  return (
    <div>
      {props.children ?
        <span onClick={toggleDrawer(true)}>
          {props.children}
        </span>
        :
        <Button onClick={toggleDrawer(true)}>Open Left</Button>
      }
      <SwipeableDrawer
        open={toggle}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {sideList()}
      </SwipeableDrawer>
    </div>
  );
};

// ______________________________________________________
// スタイル

const StyledComponent = styled(Component)`
`;

export default StyledComponent;
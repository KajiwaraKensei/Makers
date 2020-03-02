import React from "react";
import * as Next from "next";
import styled from "styled-components";
import { answerType } from "./AnswerPage";
import { question, childQuestion } from "~/store/questions";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Typography, TextField } from "@material-ui/core";
import { ClickAwayListener, ButtonGroup, Button, Grid } from '@material-ui/core';
import { MenuList, MenuItem, Popper, Paper, Grow } from '@material-ui/core';

// ______________________________________________________
//

type Props = {
  className?: string;
  answer: answerType;
  changeAnswer: (answer: answerType) => void;
  question: question;
}

// ______________________________________________________
//

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const { question, answer, changeAnswer } = props;
  const doChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    changeAnswer({ ...answer, value: event.target.value });
  }
  const normalType = (
    <div>
      <TextField value={answer.value} onChange={doChange} style={{ width: " 100%" }} multiline />
    </div>
  );
  const branchType = (
    <div><SplitButton children={question.childElements} answer={answer} doChange={changeAnswer} /></div>
  );
  return (
    <tr className={props.className} >
      <th>{question.label}</th>
      <td><div>{question.type === "normal" ? normalType : branchType}</div></td>
    </tr>
  );
};

// ______________________________________________________
//

const StyledComponent = styled(Component)`
  & > th{
    width: 30%;
    font-size: 0.8rem;
    -webkit-letter-spacing: 1.5px;
    -moz-letter-spacing: 1.5px;
    -ms-letter-spacing: 1.5px;
    letter-spacing: 1.5px;
    padding: 15px;
    border-top: 1px solid rgba(164,164,164,0.74);
    border-bottom: 1px solid rgba(164,164,164,0.74);
 }
  & > td{
    width: 70%;
    font-size: 13px;
    border-top: 1px solid rgba(164,164,164,0.74);
    border-bottom: 1px solid rgba(164,164,164,0.74);
    & > div{
      border-left: 1px solid rgba(164,164,164,0.74);
      padding: 0 10px;
      & > *{
        margin: 20px 5px ;
        font-size: 0.8rem;
        letter-spacing: 1.5px;
      }
    }
  }
`;

// ______________________________________________________
//

function SplitButton(props: { children: childQuestion[], answer: answerType, doChange: (answer: answerType) => void }) {
  const { children, answer } = props;
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleClick = () => { };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    value: number,
  ) => {
    props.doChange({ ...answer, value })
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button" style={{ width: "100%" }}>
          <Button style={{ width: "80%" }} onClick={handleClick}>{[{ id: -1, asking: "選択されていません" }, ...children][(typeof answer.value === "number" && answer.value + 1)].asking}</Button>
          <Button
            style={{ width: "20%" }}
            color="primary"
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper style={{ zIndex: 10 }} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {[{ id: -1, asking: "選択されていません" }, ...children].map((option, index) => (
                      <MenuItem
                        key={option.id}
                        selected={option.id === answer.value}
                        onClick={event => handleMenuItemClick(event, option.id)}
                      >
                        {option.asking}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
};

export default StyledComponent;
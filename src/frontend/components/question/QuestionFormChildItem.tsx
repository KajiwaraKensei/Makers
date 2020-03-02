// ______________________________________________________
// 

import React from "react";
import * as Next from "next";
import styled from "styled-components";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { IconButton, InputAdornment, FormControl, Input } from '@material-ui/core';

// ______________________________________________________
// 型定義

type Props = {
  childQuestionId: number;
  childAsking: string;
  doChangeValue: (childQuestionId: number, nextChildAsking: string) => void;
  doDelete: (childQuestionId: number) => void
  className?: string;
};

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props) => {
  const classes = useStyles({});
  const { doDelete, doChangeValue, childAsking, childQuestionId } = props;

  return (
    <div className={props.className} >
      <FormControl fullWidth className={classes.margin} variant="outlined">
        <Input
          value={childAsking}
          onChange={e => {
            doChangeValue(childQuestionId, e.target.value)
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="delete"
                onClick={() => doDelete(childQuestionId)}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </InputAdornment>}
        />
      </FormControl>
    </div>
  )
}

// ______________________________________________________
// スタイル

const StyledComponent = styled(Component)`
`
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: 200,
    },
  }),
);

export default StyledComponent;
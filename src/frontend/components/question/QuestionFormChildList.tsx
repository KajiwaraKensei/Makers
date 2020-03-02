// ______________________________________________________
// 

import React from "react";
import * as Next from "next";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreator } from "~/store";
import { childQuestion } from "~/store/questions";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TableRow, TableHead, TableCell, TableBody, Table } from '@material-ui/core';
import { QuestionFormChildItem } from ".";

// ______________________________________________________
// 型定義

type Props = {
  className?: string;
  childQuestion: childQuestion[];
};

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const { childQuestion } = props;
  const addChildQuestion = () => {
    dispatch(actionCreator.questions.addChildQuestion());
  };
  const deleteChildAction = (childQuestionId: number) => {
    dispatch(actionCreator.questions.deleteChildQuestion(childQuestionId));
  };
  const changeChildAsking = (childQuestionId: number, nextChildAsking: string) => {
    dispatch(actionCreator.questions.editChildItem(childQuestionId, nextChildAsking));
  };
  return (
    <div className={props.className} >
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">index</TableCell>
                <TableCell>内容</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {childQuestion.map((child, i) => (
                <TableRow key={"branch_asking_" + i}>
                  <TableCell align="center">{i + 1}</TableCell>
                  <TableCell align="right">
                    <QuestionFormChildItem
                      doChangeValue={changeChildAsking}
                      doDelete={deleteChildAction}
                      childAsking={child.asking}
                      childQuestionId={child.id}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
      <input
        style={{ margin: "0 auto" }}
        type="button"
        value="選択肢追加"
        onClick={addChildQuestion}
      />
    </div>
  );
};

// ______________________________________________________
// スタイル

const StyledComponent = styled(Component)`
  width: 100%;
`
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 300,
  },
});

// ______________________________________________________
//

export default StyledComponent;
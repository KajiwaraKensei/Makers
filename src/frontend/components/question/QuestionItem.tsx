// ______________________________________________________
// 

import React from "react";
import * as Next from "next";
import styled from "styled-components";
import { question } from "../../store/questions";
import { Typography, Paper } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

// ______________________________________________________
// 型定義

type Props = {
  question: question;
  deleteAction: (id: number) => void;
  onClickAction?: (id: number) => void;
  className?: string;
};

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const { question, deleteAction, onClickAction } = props;

  const breakView = (props: { title: string, value: string }) => (
    <div className="question_item_break">
      <Typography variant="caption" display="block" gutterBottom>
        {props.title}
      </Typography>
      <Typography variant="body2" display="block" gutterBottom>
        {props.value}
      </Typography>
    </div>
  );

  const doClick = () => onClickAction(question.id);


  return (
    <Paper elevation={2} style={{ position: "relative", wordWrap: "break-word", whiteSpace: "pre-wrap" }} onClick={doClick} >
      <div className={props.className} >
        {breakView({ title: "ラベル", value: question.label })}
        {breakView({ title: "問いかけ", value: question.asking })}
        {breakView({ title: "入力例・補足説明", value: question.ex })}
        {question.type === "branch" && (
          <div className="question_item_break question_item_children">
            <Typography variant="caption" display="block" gutterBottom>
              選択肢
            </Typography>
            <ul>
              {question.childElements.map((child, i) => (
                <li key={"question_child_" + i}>
                  <Typography variant="body2" display="block" gutterBottom>
                    {child.asking}
                  </Typography>
                </li>
              ))}
            </ul>
            {
              question.childElements.length === 0 &&
              <Typography variant="body2" display="block" gutterBottom>
                なし
              </Typography>
            }
          </div>
        )}
      </div>
      <DeleteOutlineIcon
        fontSize="small"
        onClick={() => deleteAction(question.id)}
        style={{ position: "absolute", top: ".3rem", right: ".3rem" }} />

    </Paper>
  );
};

// ______________________________________________________
// スタイル

const StyledComponent = styled(Component)`
  margin: .5rem 0;
  position: relative;
  & .question_item_delete{
    opacity: 0;
    position: absolute;
    top: 0;
    right: -0.3rem;
  }
  & .question_item_children{
    & > ul{
      margin: 0;
      padding-left: 1.5rem;
      list-style-type: decimal
    }
  }
  & > .question_item_break{
    padding: 0 0 .75rem;
    &:last-child{
      padding-bottom: 0;
    }
  }
  & >  .question_item_break > :first-child{
      color: #5ae;
    }

  &:hover{
    & > .question_item_delete{
      opacity: 1;
    }
  }
`;

export default StyledComponent;
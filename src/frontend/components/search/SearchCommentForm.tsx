// ______________________________________________________
// コメントを追加するフォーム

import React from "react";
import * as Next from "next";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreator } from "~/store";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// ______________________________________________________
// 型定義

type Props = {
  className?: string;
};

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const [toggle, setToggle] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const dispatch = useDispatch();

  const doSendComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(actionCreator.search.sendComment(comment));
    setToggle(false);
  };

  const commentForm = (
    <div>
      <form onSubmit={doSendComment}>
        <TextField
          id="standard-textarea"
          label="コメント"
          placeholder="コメントを入力"
          multiline
          rowsMax="4"
          fullWidth
          autoFocus
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="search_comment_button">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setToggle(false)}
          >
            キャンセル
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            送信
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div className={props.className} >
      {
        toggle ?
          commentForm
          :
          <Button variant="outlined" color="primary" onClick={() => setToggle(true)}>
            コメントする
      </Button>
      }
    </div>
  );
};

// ______________________________________________________
// スタイル
const StyledComponent = styled(Component)`
  width: 100%;
  padding: 1rem 0;
  & .search_comment_button{
    padding: .5rem 0;
    display: flex;
    justify-content: flex-end;
    & > *{
      margin-left:.5rem;
    }
  }
`;

export default StyledComponent;
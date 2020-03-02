// ______________________________________________________
//

import React from "react";
import * as Next from "next";
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import { Typography, Button } from "@material-ui/core"
import TwitterIcon from '@material-ui/icons/Twitter';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
// ______________________________________________________
//　型定義

type Props = {
  className?: string;
  result: string,
};

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const { result } = props;
  const [string, setString] = React.useState<string>(result);
  const encodeString = React.useMemo(() => encodeURI(string), [string])
  const doChange = e => {
    setString(e.target.value as string)
  };

  React.useEffect(() => {
    setString(result)
  }, [result]);

  return (
    <div className={props.className} >
      <Typography variant="h6" className="result-heading"><i className="fas fa-compact-disc result-text-icon" />結果</Typography>

      <TextField
        fullWidth
        multiline
        rowsMax="50"
        value={string}
        onChange={doChange}
      />


      <div className="sns-share">

        <Typography variant="h6" className="result-heading"><i className="fas fa-share-alt-square" />SNSで送信</Typography>
        <a href={"https://twitter.com/intent/tweet?text=" + encodeString} rel="noopener noreferrer" target="_blank">
          <Button
            variant="outlined"
            color="primary"
            className="sns-button sns-twitter"
            startIcon={<i className="fab fa-twitter" />}
          >
            Twitter
          </Button>
        </a>
        <a href={"line://msg/text/?" + encodeString}>
          <Button
            variant="outlined"
            color="primary"
            className="sns-button sns-line"
            startIcon={<i className="fab fa-line" />}
          >
            LINE
      </Button>
        </a>
      </div>
    </div>
  );
};

// ______________________________________________________
// スタイル

const StyledComponent = styled(Component)`
& .sns-button{
  margin-right : 1rem;
  margin-top: .75rem;
  margin-bottom: .25rem;
  text-transform: none;
}

& a{
  text-decoration: none;
}

& > .sns-share{
  margin: 5rem auto 0;
}
& .sns-twitter{
  color: #36a0db;
  border: 1px solid rgba(63, 132, 181, 0.5);
  &:hover{
    border-color:#3fb0b5;
  }
}
& .result-heading{
  & i{
    margin-right: .25rem;
    color: #0048b7;
    font-size: 1.25rem;
  }
}
& .sns-line{
  color: #69b956;
  border: 1px solid rgba(63, 181, 67, 0.5);
  &:hover{
    border: 1px solid #3fb553;
    background-color: rgba(63, 181, 67, 0.08);
  }
}
  width: 100%;
  height: 100%;
  padding: .7rem 0rem;
`

export default StyledComponent;
// ______________________________________________________
// 検索結果の詳細の表示

import React from "react";
import * as Next from "next";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import { Button, Paper, Typography, Fab } from '@material-ui/core';
import { searchItem } from "~/store/search";
import { PreviewTemplate } from "~/components/template";
import { createTemplate } from "~/global";
import { SearchCommentList } from ".";
import { useRouter } from "next/router";
import SendIcon from '@material-ui/icons/Send';

// ______________________________________________________
// 型定義

type StateProps = {
  windowSize: number;
  breakPoint: number;
};

type Props = {
  className?: string;
  result: searchItem;
  closeAction: () => void;
};
const selector = (state: RootState): StateProps => ({
  windowSize: state.window.width,
  breakPoint: state.window.breakPoint
});

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props) => {
  const state = useSelector(selector);
  const { breakPoint, windowSize } = state;
  const { result } = props;
  const contents = React.useMemo(() => createTemplate(result.template, {}, result.questions), [result]);
  const { title, date, author, tags, fav, questions, memo, id } = result;
  const router = useRouter();
  const doTemplate = async () => {
    router.push("/template/answer/" + id);
  };
  const breakView = (props: { title: string, value: string }) => (
    <div className="question_item_break">
      <Typography variant="caption" display="block" gutterBottom>
        {props.title}
      </Typography>
      <Typography variant="body2" display="block" gutterBottom style={{ paddingLeft: ".4rem" }}>
        {props.value}
      </Typography>
    </div>
  );

  return (
    <div className={props.className} >
      <Paper elevation={3} className="search_preview_paper">
        {breakPoint > windowSize && <Button className="search_preview_back" onClick={props.closeAction} variant="outlined" color="primary">戻る</Button>}
        <div className="template_wide_header"><Typography variant="button">タイトル</Typography></div>
        <Typography variant="h4">{title}</Typography>

        <div className="template_wide_header"><Typography variant="button">タグ</Typography></div>
        <div className="result_tags">
          {tags.map((tag, i) => (
            <div key={i}>{tag}</div>
          ))}
          {!tags.length && "なし"}
        </div>
        <div className="template_wide_header"><Typography variant="button">プレビュー</Typography></div>
        <div className="result_temp">
          <PreviewTemplate
            templateContents={contents.contents}
            areas={contents.areas}
            questions={questions}
          />
        </div>
        <div className="template_wide_header"><Typography variant="button">情報</Typography></div>
        <div className="result_info">
          {breakView({ title: "メモ", value: memo })}
          {breakView({ title: "作成日", value: date })}
          {breakView({ title: "作者", value: author.name })}
        </div>
        <div className="template_wide_header"><Typography variant="button">コメント</Typography></div>
        <SearchCommentList />
      </Paper>
      <Fab aria-label="" className="preview_fav" color="primary" onClick={doTemplate} >
        <SendIcon />
      </Fab>
    </div>
  );
};

// ______________________________________________________
// スタイル

const StyledComponent = styled(Component)`
  padding: 1.5rem;
  width: 100%;
  height: 100%;
  overflow: scroll;
  & .question_item_break{
    transition:all .2s .1s ease-in;
    padding: 0 0 .75rem;
    &:last-child{
      padding-bottom: 0;
    }
  }
  & .question_item_break > :first-child{
      color: #5ae;
  }
  & .search_preview_paper{
    position: relative;
    padding: .5rem 2rem;
    min-height: 100%; 
  }  
  & .search_preview_back{
    position: absolute;
    background-color: #fff;
    top: .3rem;
    right: .3rem;
    
  }
  & .template_wide_header{
    background: #fff;
    padding: .75rem .75rem 0;
    font-weight: bold;
    margin-top: 1.5rem;
    color: #557;
    text-align: right;
    &:first-child{
      margin: 0;
    }
    &::before{
      content: '';
      display: block;
      width: calc( 100% + 32px );
      height: 1px;
      margin-left: -16px;
      background: linear-gradient(to left, #2980b9, #6dd5fa, #cfcffa);
    }
    &::before{
      margin-bottom: 8px;
    }
    &::after{
      margin-top: 8px;
    }
  }
  & > * > .result_info{
    padding: 1rem 0 1rem;
  }
  & > * > .result_temp{
    margin: .5rem auto;
  }
  & > * > h2{
    margin: 0;
    padding: .5rem .2rem;
  }
  & > * > .result_tags{
    display: flex;
    flex-wrap: wrap;
    border-radius: .5rem;
    padding: .25rem 0;
    font-size: .9rem;
    & > div{
      color: #fff;
      background-color: #333;
      border: 1px solid #888;
      padding: .3rem .6rem;
      margin: .3rem .7rem .3rem 0;
      &:hover{
        cursor:pointer;
        color: #888;
        background-color: #fff;
      }
    }
  }
  & .preview_fav{
    position: fixed;
    bottom: 2rem;
    right: 2rem;
  }
`;

export default StyledComponent;
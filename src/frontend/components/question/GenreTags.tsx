// ______________________________________________________
// タグの編集

import React from "react";
import * as Next from "next";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState, actionCreator } from "~/store";
import Chip from '@material-ui/core/Chip';
// ______________________________________________________
// 型定義

type Props = {
  className?: string;
};

const selector = (state: RootState) => state.template.tags;

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const tags = useSelector(selector);
  const dispatch = useDispatch();
  const doChange = (nextStrings: string[]) => {
    dispatch(actionCreator.template.setTags(nextStrings))
  };
  return (
    <div className={props.className} >
      <ReactTagInput
        tags={tags}
        onChange={doChange}
      />
    </div>
  )
}

// ______________________________________________________
// スタイル

const StyledComponent = styled(Component)`
  width: 99%;
  overflow: scroll;
  display: flex;
  flex-wrap: wrap;
  & .input_tag{
    border: 1px solid #ccc;
    padding: 1rem;
    overflow:scroll;
    & > input{
      margin: 1rem .3rem;
      border: 1px solid #ddd;
      border-radius: .6rem;
      padding: .5rem;
    }
  }
  .made_tags{
    background-color: #667;
    display: inline-block;
    text-align: center;
    margin: .1rem .2rem;
    padding: .1rem .4rem;
    border: 1px solid #bbd;
    border-radius: .2rem;
    color: #fff;
  }
`;

interface reactTagInputType {
  tags: string[];
  onChange: (nextStrings: string[]) => void
};

const ReactTagInput = (props: reactTagInputType) => {
  const tags = React.useMemo(() => props.tags, [props.tags])
  const [str, setStr] = React.useState("")
  const changeStr = (event: any) => {
    setStr(event.target.value);
  }
  const doKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      str && props.onChange([...props.tags, str])
      setStr("")
    }
    if (event.keyCode === 8) {
      if (!str) {
        const deleteStrS = [...props.tags]
        setStr(deleteStrS.pop());
        props.onChange(deleteStrS)
      }
    }
  }

  const deleteTag = (index: number) => {
    let nextTags: string[] = []
    props.tags.forEach((tag, i) => {
      nextTags = i !== index ? [...nextTags, tag] : nextTags
    })
    props.onChange(nextTags)
  }
  return (
    <div style={{ width: "100%" }} className="input_tag">
      {tags.map((tag, i) => (
        <Chip
          key={`tag_key_${tag}_${i}`}
          label={tag}
          onDelete={() => deleteTag(i)}
          variant="outlined"
          color="primary" />
      ))}
      <input onKeyDown={doKeyDown} type="text" value={str} onChange={changeStr} placeholder="タグを追加.." style={{ width: "100%" }} />
    </div>
  )
}

export default StyledComponent;
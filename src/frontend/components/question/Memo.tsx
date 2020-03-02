// ______________________________________________________
// 概要欄の編集

import React from "react"
import * as Next from "next"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "~/store"
import TextField from '@material-ui/core/TextField';
import { setTemplateMemo } from "~/store/template/actions";

// ______________________________________________________
// 型定義

type Props = {
  className?: string;
}

const selector = (state: RootState) => state.template.memo

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const memo = useSelector(selector);
  const dispatch = useDispatch();
  const doChange = (e) => {
    dispatch(setTemplateMemo(e.target.value))
  }

  return (
    <div className={props.className} >
      <TextField
        fullWidth
        id="standard-textarea"
        label="注意点など"
        placeholder="MEMO"
        multiline
        rowsMax="15"
        value={memo}
        onChange={doChange}
      />
    </div>
  )
}

// ______________________________________________________
// スタイル

const StyledComponent = styled(Component)`
  width: 100%;
`


export default StyledComponent;
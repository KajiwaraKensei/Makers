// ______________________________________________________
//  テンプレートの編集

import React from "react"
import Head from "next/head"
import Component from "~/components/EditTemplatePage";
import { NextPage, } from 'next';
import { useRouter } from "next/router"
import { actionCreator } from "~/store"
import AppBar from "~/components/AppBar"
import axios from "~/MyAxios";
import { useDispatch } from "react-redux";

// ______________________________________________________
//  
interface Props { }
const App: NextPage<Props> = props => {
  const router = useRouter();
  const dispatch = useDispatch();
  React.useEffect(() => {
    const { templateId } = router.query;
    axios.post("/template/get", { templateId }).then((res) => {
      dispatch(actionCreator.template.setTemplateTitle)
      if (res.data.success) {
        const { questions, memo, title, template, tags } = res.data
        dispatch(actionCreator.template.setEditString(template))
        dispatch(actionCreator.template.setTemplateMemo(memo))
        dispatch(actionCreator.template.setTemplateTitle(title))
        dispatch(actionCreator.questions.setQuestions(questions))
        dispatch(actionCreator.template.setTags(tags))
      } else {
        dispatch(actionCreator.loading.failLoading("template", "読み込み失敗"))
      }
    }).catch((error) => {
      if (typeof error.response.data.errorMessage === "string") {
        dispatch(actionCreator.loading.failLoading("template", error.response.data.errorMessage))
      } else dispatch(actionCreator.loading.failLoading("template", "読み込み失敗"))
    }
    )
  }, [])
  return (
    <>
      <Head>
        <title>テンプレート</title>
      </Head>
      <style jsx global>{`
      body { 
        margin: 0;
        height: 100%;
        width: 100%;
      }
      * {
        box-sizing: border-box;
      }
    `}</style>

      <AppBar>
        <Component />
      </AppBar>
    </>
  )
}

// ______________________________________________________
//  テンプレートの編集

export default App
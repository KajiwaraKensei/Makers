// ______________________________________________________
//  テンプレートの実行ページ

import React from "react"
import Head from "next/head"
import Component from "~/components/AnswerPage";
import { NextPage } from 'next';
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux";

import { actionCreator, RootState } from "~/store"
import AppBar from "~/components/AppBar"
import axios from "~/MyAxios"
import { createTemplate } from "~/global"

// ______________________________________________________
//  

interface Props {
}

const selector = (state: RootState) => ({
  backAnswer: state.template.backAnswer
})
const App: NextPage<Props> = props => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { backAnswer } = useSelector(selector)
  const { templateId } = router.query;

  React.useEffect(async () => {
    if (backAnswer) {
      dispatch(actionCreator.template.setBackAnswer(false))
    } else {
      dispatch(actionCreator.loading.startLoading("template"));
      axios.post("/template/execution", { id: templateId }).then(() => { });

      axios.post("/template/get", { templateId }).then(res => {
        if (res.data.success) {
          const { questions, memo, title, template, tags, } = res.data;
          console.log("questions", questions);
          console.log("data", res.data);

          const contents = createTemplate(template, {}, questions)
          console.log("contents", contents);

          dispatch(actionCreator.template.setArea(contents.areas))
          dispatch(actionCreator.template.setTemplateContents(contents.contents))
          dispatch(actionCreator.template.setEditString(template))
          dispatch(actionCreator.template.setTemplateMemo(memo))
          dispatch(actionCreator.template.setTemplateTitle(title))
          dispatch(actionCreator.questions.setQuestions(questions))
          dispatch(actionCreator.template.setTags(tags))
          dispatch(actionCreator.loading.successLoading("template"))
        } else {
          dispatch(actionCreator.loading.failLoading("template", "読み込み失敗"))
        }
        dispatch(actionCreator.loading.stopLoading("template"))

      }).catch((error) => {
        if (typeof error.response.data.errorMessage === "string") {
          dispatch(actionCreator.loading.failLoading("template", error.response.data.errorMessage))
        } else dispatch(actionCreator.loading.failLoading("template", "読み込み失敗"))
        dispatch(actionCreator.loading.stopLoading("template"))
      })
    }
  }, [])
  return (
    <>
      <Head>
        <title>実行</title>
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
//  

export default App
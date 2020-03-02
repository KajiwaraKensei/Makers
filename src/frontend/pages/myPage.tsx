import React from "react"
import Head from "next/head"
import Component from "../components/myPage/MyPage";
import { NextPage, NextPageContext } from 'next';
import { SnackbarProvider } from 'notistack';
import AppBar from "../components/AppBar"

interface Props {
}

const App: NextPage<Props> = props => {

  return (
    <>
      <Head>
        <title>マイページ</title>
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

      <SnackbarProvider maxSnack={3}>
        <AppBar>
          <Component />
        </AppBar>
      </SnackbarProvider>
    </>
  )
}

interface Context extends NextPageContext {
  // any modifications to the default context, e.g. query types
}



export default App
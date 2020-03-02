// ______________________________________________________
//  新規テンプレート検索ページ

import React from "react"
import Head from "next/head"
import Component from "../../components/EditTemplatePage";
import { NextPage } from 'next';
import AppBar from "../../components/AppBar"
// ______________________________________________________
//  

interface Props {
}


const App: NextPage<Props> = props => {
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
//  


export default App
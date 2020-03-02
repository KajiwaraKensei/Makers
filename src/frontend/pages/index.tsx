import React from "react"
import Head from "next/head"
import { NextPage } from 'next';
import AppBar from "../components/AppBar"
import Component from "../components/TopPage"
interface Props {
}

const App: NextPage<Props> = props => {
  return (
    <>
      <Head>
        <title>Hello</title>
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



export default App
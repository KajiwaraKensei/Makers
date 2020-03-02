import React from "react"
import Head from "next/head"
import Component from "../components/search/SearchPage";
import { NextPage, NextPageContext } from 'next';
import { SnackbarProvider } from 'notistack';
import AppBar from "../components/AppBar"

interface Props {
  title: string
}

const App: NextPage<Props> = props => {

  return (
    <>
      <Head>

        <title>{props.title}</title>
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


export default App
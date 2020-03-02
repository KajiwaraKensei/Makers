import * as React from "react"
import Document, { DocumentContext } from "next/document"
import { ServerStyleSheet } from "styled-components"
import DefaultLayout from "../layouts/index"
import axios from "axios";
// ______________________________________________________
//  

export default class extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalREnderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalREnderPage({
        enhanceApp: (App: any) => (props: any) => sheet.collectStyles(<App {...props} />)
      })
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: [...(initialProps.styles as any), ...sheet.getStyleElement()]
    }
  }
  render() {
    return <DefaultLayout />
  }
}

import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { FontLoader } from '@/presentation/scripts'


export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        }) 

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      }
    } finally {
      sheet.seal()
    }
  }
  
  render(): JSX.Element {
      return (
          <Html>
              <Head>
                  <FontLoader />
                  <script type='javascript' src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.min.js'></script>
              </Head>
              <body>
                  <Main />
                  <NextScript />
              </body>
          </Html>
      )
  }
}
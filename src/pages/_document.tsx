import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { FontLoader } from '@/presentation/scripts'

// @ts-ignore
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

        const originalProps = await ctx.defaultGetInitialProps(ctx);

        return {
            ...(originalProps || {}),
            styles: [originalProps.styles, sheet.getStyleElement()],
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
              </Head>
              <body>
                  <Main />
                  <NextScript />
              </body>
          </Html>
      )
  }
}

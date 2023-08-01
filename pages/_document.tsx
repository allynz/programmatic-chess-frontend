import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
                {/* needed to use crossOrigin https://github.com/aws-amplify/amplify-hosting/issues/195 */}
                <link crossOrigin='use-credentials' rel="manifest" href="/favicon_io/site.webmanifest" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
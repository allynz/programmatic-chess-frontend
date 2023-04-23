import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon_redketchup/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon_redketchup/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon_redketchup/favicon-16x16.png" />
                <link rel="manifest" href="/favicon_redketchup/site.webmanifest" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
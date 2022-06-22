import '../styles/globals.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // seems we need to import on every page we need coz on loading directly, it doesn't seem to be injected
import type { AppProps } from 'next/app'
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp

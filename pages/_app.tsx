import { User } from 'firebase/auth';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Loading from '../components/general/loading';
import UserContext from '../contexts/UserContext';
import { currentUserObserver } from '../firebase/config';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/chessground.css';
import '../styles/globals.scss';
import { eq } from '../utilities/equals';

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (eq(loading, false)) return;

    currentUserObserver((user) => {
      setUser(user);
      if (loading) {
        setLoading(false);
      }
    });
  }, [loading]); // react was giving warning for `loading` deps not added, so added it

  return (<>
    <Head>
      <title>CodingChess</title>
      {/* https://nextjs.org/learn/seo/rendering-and-ranking/metadata */}
      <meta
        name="description"
        content="A platform to improve your programming skills by solving interactive problems. Solve chess-related problems to improve your coding abilities!"
      />
    </Head>
    {
      loading ?
        <LoadingPage /> :
        <LoadedPage
          Component={Component}
          pageProps={pageProps}
          user={user} />
    }
  </>);
}

export default MyApp;

const LoadingPage = () => {
  return (<>
    <div
      style={{
        height: "100vh",
        width: "100vw"
      }}>
      <Loading />
    </div>
  </>);
};

const LoadedPage = ({ pageProps, user, Component }: any) => {
  return (
    <>
      <div
        style={{
          // min dimensions needed as resizing can happen
          // nice, I guess height also adjusts automatically when width is set
          minHeight: "40rem",
          minWidth: "90rem"
        }}>
        {/* LATER: Check wrapper for all pages config for minWidth and minHeight
    As scrolling is not allowed on all pages, that could be an issue
    Leave for now I guess
    Probably set minWidth and minHeight for each page respectively and test like that only
     */}
        <UserContext.Provider value={user} >
          <Component {...pageProps} />
        </UserContext.Provider>
      </div>
    </>
  );
}

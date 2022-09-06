import { User } from 'firebase/auth';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Loading from '../components/general/loading';
import UserContext from '../contexts/UserContext';
import { currentUserObserver } from '../firebase/config';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/chessground.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (loading == false) return;

    currentUserObserver((user) => {
      setUser(user);
      if (loading) {
        setLoading(false);
      }
    });
  }, [loading]); // react was giving warning for `loading` deps not added, so added it

  if (loading) {
    return (<>
      <div
        style={{
          height: "100vh",
          width: "100vw"
        }}>
        <Loading />
      </div>
    </>);
  } else {
    return (
      <div
        style={{
          // min dimensions needed as resizing can happen
          // nice, I guess height also adjusts automatically when width is set
          minHeight: "40rem",
          minWidth: "90rem"
        }}>
        {/* TODO: Check wrapper for all pages config for minWidth and minHeight
      As scrolling is not allowed on all pages, that could be an issue
      Leave for now I guess
      Probably set minWidth and minHeight for each page respectively and test like that only
       */}
        <UserContext.Provider value={user} >
          <Component {...pageProps} />
        </UserContext.Provider>
      </div>
    );
  }
}

export default MyApp;

import { User } from 'firebase/auth';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import UserContext from '../contexts/UserContext';
import { currentUserObserver } from '../firebase/config';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // seems we need to import on every page we need coz on loading directly, it doesn't seem to be injected
import '../styles/chessground.css'; // find a better place for this or import it from the module itself if possible, also find a better way to use it, right now I got it from combining styles here: https://github.com/lichess-org/chessground/issues/134
import '../styles/globals.css';

// Have a wrapper for elements that use nav and loader, but not for all - like submission details page can work without Nav, treat is as a raw page, as Nav can hinder focus
// TODO: types/react they are manually added in package.json so update them whenever it is fixed: https://www.npmjs.com/package/@types/react
// TODO: Make elements like rendering on container - set their height and width to 100%
// TODO: can use pagesplit with Navbar to hide it if more focus is needed on the page - just have show or hide option though, no manual resizing
// separate out in components to keep it simple
// would have to do context chaining if lot of contexts present
// TODO: Make sure every element has a PageWrapNav associated with it, we should do that in App.js though to be honest
// See if even on reload you can use Nav, as we already have front and back
function MyApp({ Component, pageProps }: AppProps) {
  // Some pages don't require auth like submissiondetail page so loading for them is unnecessary
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // console.log("ggg"); can log like this to check if compoenent does not keep rendering infinite
  useEffect(() => {
    // setState re-renders the widget so have use useEffect to add listener only once
    // see if this listener definitely starts up on loading a page, and will not go inot infinite loading loop
    currentUserObserver((user) => {
      setUser(user);
      if (loading) {
        // setState changes will not work inside useEffect so don't rely on that
        setLoading(false);
      }
    });
  }, []);

  // Does this go against nextJS principles?, like setting up a loading block. Prob not, it's up to the developer
  return (<>
    {loading
      ?
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        {/* Check for better spinner, https://www.npmjs.com/package/react-spinners */}
        <Spinner animation="border" />
      </div>
      :
      <UserContext.Provider value={user} >
        <Component {...pageProps} />
      </UserContext.Provider>
    }
  </>);
}

export default MyApp;

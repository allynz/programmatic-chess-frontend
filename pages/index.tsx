import type { NextPage } from 'next';
import Link from 'next/link';
import { XDiamondFill } from 'react-bootstrap-icons';
import ChessSquareBackground from '../components/chessSquareBackground/chessSquareBackground';
import PageBottom from '../components/landingpage/pageBottom';
import PageTop from '../components/landingpage/pageTop';
import TutorialEditor from '../components/landingpage/tutorialEditor';
import PageWrapNav from '../components/navbar/pageWrapper';

// literally a flex grid this is!!
// TODO: See how other sites do large screens, keep your content width fixed, and let padding on left and right be automatic depending on screen
// Can also add scroll animations with css
const Home: NextPage = ({ problemList, pieces, displayCode }: any) => {
  return (<>
    <PageWrapNav>
      <PageTop
        pieces={pieces}
        code={displayCode} />
      <Examples />
      {
        problemList
        &&
        problemList.map((problem: any) => (
          <div key={problem.id}>
            <TutorialEditor problem={problem} />
            <br></br>
          </div>
        ))
      }
      <PageBottom />
      <Footer />
    </PageWrapNav>
  </>)
}

export default Home;

const Footer = () => {
  const Diamonds = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          overflow: "clip"
        }}>
        {
          [...Array(100)]
            .map(
              k =>
              // replace this with chess pieces?
              (
                // <Square
                //   style={{
                //     flexShrink: "0",
                //     padding: "0.5px"
                //   }}
                //   key={k}
                //   color={random(1) == 0 ? 'red' : 'purple'}
                //   size={100} />
                <div
                  key={k}
                  style={{
                    flexShrink: "0",
                    padding: "0.5px"
                  }}>
                  <ChessSquareBackground />
                </div>
              ))
        }
      </div>
    );
  };

  // Can add more interactivity to this element, but fine for now
  return (<>
    <div
      style={{
        marginTop: "10rem", // this is better than padding as height considers padding as well
        height: "20rem",
        width: "100%",
        backgroundColor: "lightgreen",
        overflow: "clip"
      }}>
      {[...Array(6)].map(num => (<Diamonds key={num} />))}
    </div>
  </>);
}

// The editors know the symbols and variables in the context of the page
// so it will prompt to autocomplete those things as well, see if we can remedy that
const Examples = () => {
  return (<>
    <div
      style={{
        paddingTop: "15rem",
        paddingLeft: "10%",
        paddingRight: "10%",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <h1
        style={{
          fontSize: "3rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        {[...Array(3)].map(num => (
          <XDiamondFill key={num} color='royalblue' size={70} />
        ))}
        <p
          style={{
            paddingLeft: "2rem",
            paddingRight: "2rem"
          }}>
          Example Problems
        </p>
        {[...Array(3)].map(num => (
          <XDiamondFill key={num} color='royalblue' size={70} />
        ))}
      </h1>
      <p
        style={{
          textAlign: "center"
        }}>
        Below are few problems to get you started <br />
        Write solution code on the editor given on right hand side of the problem <br />
        Log in to submit solution directly! <br />
        If you encounter any error/incorrect submissions, be sure to read read submission guidelines on [<Link href={`/about`}>About Page</Link>]
      </p>
    </div>
  </>);
};

export async function getStaticProps() {
  const tutorialProblems = [1000, 1001, 1002];
  // these functions can be used at multiple places - combine them at 1
  const list = await Promise.all(
    tutorialProblems
      .map(async (id) => await fetchProblem(id))
  );

  // TODO: Later see for randomizing pieces/code also
  const displayChessboardPieces =
    await fetch(`https://programmatic-chess.uc.r.appspot.com/displayPieces`)
      .then(res => res.json())
      .then(res => JSON.parse(res));
  const displayCode: string =
    await fetch(`https://programmatic-chess.uc.r.appspot.com/displayCode`)
      .then(res => res.json());

  return {
    props: {
      problemList: list,
      pieces: displayChessboardPieces,
      displayCode: displayCode
    }
  }
}

// TODO: Make bulk API later
// resolve error scenarios
async function fetchProblem(id: number) {
  try {
    const res = await fetch(`https://programmatic-chess.uc.r.appspot.com/problem?id=${id}`)
    return await res.json();
  } catch (error) {
    return {};
  }
}

import type { NextPage } from 'next';
import PageBottom from '../components/landingpage/pageBottom';
import PageTop from '../components/landingpage/pageTop';
import TutorialEditor from '../components/landingpage/tutorialEditor';
import PageWrapNav from '../components/navbar/pageWrapper';

// literally a flex grid this is!!
const Home: NextPage = ({ problemList, pieces, displayCode }: any) => {
  return (<>
    <PageWrapNav>
      <PageTop
        pieces={pieces}
        code={displayCode} />
      If any error, please read submission guidelines
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
  return (<>
    <div
      style={{
        height: "10rem",
        width: "100%",
        backgroundColor: "aqua"
      }}>

    </div>
  </>);
}

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

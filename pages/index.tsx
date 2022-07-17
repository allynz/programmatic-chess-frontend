import type { NextPage } from 'next'
import IndexEditorDisplay from '../components/editor/indexEditorDisplay'
import ProblemDisplay from '../components/information/problemDisplay'
import { reducedDataMap } from '../components/information/problemDisplayData'
import PageWrapNav from '../components/navbar/pageWrapper'

// literally a flex grid this is!!
const Home: NextPage = ({ problemList }: any) => {
  return (<>
    <PageWrapNav>
      <div>
        Wecome to App

        If the solution fails, make sure to read the submission guidelines [here](link to About page #Submission Guidelines)
      </div>
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

    </PageWrapNav>
  </>)
}

export default Home;

// submit them to a different faster queue
const TutorialEditor = ({ problem }: any) => {
  console.log(problem);

  return (<>
    <div
      style={{
        display: "grid",
        height: "30rem",
        gridTemplateRows: "100%",
        gridTemplateColumns: "7% 40% 5% 40% 7%"
      }}>
      <br></br>
      <ProblemDisplay
        problem={problem}
        createDataMap={reducedDataMap}
        // keep false here
        isSolved={false} />
      <br></br>
      {/* Have a bouncing tooltip on Submit to draw attention */}
      <IndexEditorDisplay problemId={problem.id} defaultCode={problem.defaultCode} />
      <br></br>
    </div>
  </>);
}

export async function getStaticProps() {
  const tutorialProblems = [1000, 1001, 1002];
  const list = await Promise.all(
    tutorialProblems
      .map(async (id) => await fetchProblem(id))
  );

  return {
    props: { problemList: list }
  }
}

// TODO: Make bulk API later
// resolve error scenarios
async function fetchProblem(id: number) {
  try {
    const res = await fetch(`http://localhost:8080/problem?id=${id}`)
    return await res.json()
  } catch (error) {
    return {}
  }
}

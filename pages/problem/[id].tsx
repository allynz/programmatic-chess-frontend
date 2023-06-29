import PageSplitWrapper from "../../components/divider/pageSplit";
import EditorDisplay from "../../components/editor/editorDisplay";
import { useDataMap } from "../../components/hooks/useDataMap";
import { useSolvedProblemsList } from "../../components/hooks/useSolvedProblemsList";
import ProblemDisplay from "../../components/information/problemDisplay";
import PageWrapNav from "../../components/navbar/pageWrapper";
import BACKEND from "../../configs/hostConfig";

// LATER: Fix prop type
const Problem = ({ problem }: any) => {
    const solvedProblems: Array<number> = useSolvedProblemsList();
    // console.log("solved Problems", solvedProblems);

    const ProblemDisplayWrap = (minWidth: string) => {
        return (
            <div
                key={"problemDisplayWrap"}
                className={`fit-container clip-overflow`}
                style={{
                    minWidth: minWidth
                }}>
                <ProblemDisplay
                    problem={problem}
                    createDataMap={useDataMap}
                    // LATER: mayb this can be optimised if problem size grows large
                    isSolved={solvedProblems.some(p => p === problem.id)} />
            </div>
        );
    };

    const EditorDisplayWrap = (minWidth: string) => (
        <div
            key={"editorDisplayWrap"}
            className={`fit-container clip-overflow`}
            style={{
                minWidth: minWidth,
                zIndex: 2
            }}>
            <EditorDisplay problemId={problem.id} />
        </div>
    );

    return (
        <PageWrapNav stickyNav constrainToViewport>
            <div
                style={{
                    height: "100%",
                    // this causes submission table not to overflow!
                    overflow: "scroll"
                }}>
                <PageSplitWrapper
                    panels={[
                        ProblemDisplayWrap,
                        EditorDisplayWrap
                    ]} />
            </div>
        </PageWrapNav>
    )
}

export default Problem;

// watch out for any security issues in URL, and data fetching, access control - prob not as users might not see it, it only runs on server
export async function getStaticProps({ params }: { params: any }) {

    //console.log("params", params);

    // convert data to required types here only
    // can we change this to a bulk API?
    // make sure the values for frontend are fine for size limits if lots of problems are added
    const data = await
        fetch(BACKEND + `/problem?id=${params.id}`)
            .then(res => res.json())
            .catch(error => {
                return {};
            });
    //console.log("problemData", data);

    return {
        props: { problem: data }
    }
}

export async function getStaticPaths() {
    const problemData = await
        fetch(BACKEND + '/problems')
            .then(res => res.json())
            .catch(error => {
                //console.log(error);
                return [];
            }); // it's size should be reasonable enough that build times are less, which it is for now

    const { data } = problemData;
    const paths = data.map((problem: number) => {
        return {
            params: {
                id: problem.toString()
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}
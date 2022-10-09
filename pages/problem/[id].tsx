import PageSplitWrapper from "../../components/divider/pageSplit";
import EditorDisplay from "../../components/editor/editorDisplay";
import { useDataMap } from "../../components/hooks/useDataMap";
import { useSolvedProblemsList } from "../../components/hooks/useSolvedProblemsList";
import ProblemDisplay from "../../components/information/problemDisplay";
import PageWrapNav from "../../components/navbar/pageWrapper";
import BACKEND from "../../configs/hostConfig";
import { eq } from "../../utilities/equals";

// TODO: Fix prop type
const Problem = ({ problem }: any) => {
    const solvedProblems: Array<number> = useSolvedProblemsList();
    //console.log("solved Problems", solvedProblems);

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
                    isSolved={solvedProblems.some(p => eq(p, problem.id))} />
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
    const data = await
        fetch(BACKEND + `/problem?id=${params.id}`)
            .then(res => res.json())
            .catch(error => {
                return {};
            }); // TODO: watch out for any security issues here, while passing params

    return {
        props: { problem: data }
    }
}

// TODO: fix it before releasing to production, also check behaviour when internet not present
export async function getStaticPaths() {
    const data: Array<number> = await
        fetch(BACKEND + '/problems')
            .then(res => res.json())
            .catch(error => {
                //console.log(error);
                return [];
            }); // it's size should be reasonable enough that build times are less

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
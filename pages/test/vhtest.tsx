import PageSplitWrapper from "../../components/divider/pageSplit";
import EditorDisplay from "../../components/editor/editorDisplay";
import ProblemDisplay from "../../components/information/problemDisplay";
import { useDataMap } from "../../components/information/problemDisplayData";
import TopNavBar from "../../components/navbar/pageNav";

const Page = ({ problem }: any) => {
    const ProblemDisplayWrap = (minWidth: string) => {
        return (
            <div
                key={"problemDisplayWrap"}
                className={`fit-container`}
                style={{
                    minWidth: minWidth
                }}>
                <ProblemDisplay
                    problem={problem}
                    createDataMap={useDataMap}
                    isSolved={false} />
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

    return (<>
        <div
            style={{
                height: "100vh",
                width: "100vw",
                overflow: "clip",
                display: "flex",
                flexDirection: "column"
            }}>
            <TopNavBar />
            <div
                style={{
                    height: "100%",
                    overflow: "scroll"
                }}>
                <PageSplitWrapper
                    panels={[
                        ProblemDisplayWrap,
                        EditorDisplayWrap
                    ]} />
            </div>
        </div>
    </>);
}

export default Page;

// watch out for any security issues in URL, and data fetching, access control - prob not as users might not see it, it only runs on server
export async function getStaticProps() {

    // convert data to required types here only
    // can we change this to a bulk API?
    const data = await
        fetch(`https://programmatic-chess.uc.r.appspot.com/problem?id=2`)
            .then(res => res.json())
            .catch(error => {
                return {};
            }); // TODO: watch out for any security issues here, while passing params

    return {
        props: { problem: data }
    }
}
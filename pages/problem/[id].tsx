import EditorDisplay from "../../components/editor/editorDisplay";
import ProblemDisplay from "../../components/information/problemDisplay";
import PageSplitWrapper from "../../components/divider/pageSplit";
import PageWrapNav from "../../components/general/pageWrapper";
import { useEffect, useRef } from "react";

// TODO: Update UI for solved problems
export default function Problem({ problem }: any) {

    const ProblemDisplayWrap = ({ minWidth }: { minWidth: string }) => {
        // const dref = useRef<any>(null);

        // useEffect(() => {
        //     if (dref.current) {
        //         console.log("mw", dref.current.style.minWidth);
        //         dref.current.style.minWidth = minWidth;
        //     }
        // }, [minWidth]);

        return (
            <div
                key={"problemDisplayWrap"}
                style={{
                    overflow: "clip",
                    minWidth: minWidth
                }}>
                <ProblemDisplay
                    problem={problem} />
            </div>
        );
    };

    const EditorDisplayWrap = (minWidth: string) => (
        <div
            key={"editorDisplayWrap"}
            style={{
                overflow: "clip",
                height: "100%",
                width: "100%",
                minWidth: minWidth
            }}>
            <EditorDisplay
                problemId={problem.id} />
        </div>
    );

    return (
        <PageWrapNav stickyNav constrainToViewport>
            <div
                style={{
                    height: "100%",
                    width: "100%"
                    // add grid if necessary, don't any use though right now
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

// also do getServerProps fallback if data not cached here
// TODO: see if this a good idea for IDE setting changes, as the pages are cached
// is it a good idea when accounts are there? Does it affect anything else other than the params use?
// watch out for any security issues in URL, and data fetching, access control
export async function getStaticProps({ params }: any) {

    // convert data to required types here only
    const data = await
        fetch(`http://localhost:8080/problem?id=${params.id}`)
            .then(res => res.json())
            .catch(error => {
                //console.log(error);
                return {
                    id: 1,
                    statement: "Problem Statement",
                    solution: "Problem Solution"
                };
            }); // TODO: watch out for any security issues here, while passing params

    return {
        props: { problem: data }
    }
}

// TODO: fix it before releasing to production, also check behaviour when internet not present
export async function getStaticPaths() {
    const reqDef = [1, 2, 3, 4, 5];

    const data = await
        fetch('http://localhost:8080/problems')
            .then(res => res.json())
            .catch(error => {
                //console.log(error);
                return reqDef;
            }); // it's size should be reasonable enough that build times are less
    console.log(data);

    const paths = data.map((problem: number) => {
        return { params: { id: problem.toString() } }
    })

    return {
        paths,
        fallback: false
    }
}
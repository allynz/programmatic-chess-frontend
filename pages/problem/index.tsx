import { getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useSolvedProblemsList } from "../../components/hooks/useSolvedProblemsList";
import PageWrapNav from "../../components/navbar/pageWrapper";
import Tag from "../../components/tag/tag";
import BACKEND from "../../configs/hostConfig";
import { getProblemDocument } from "../../firebase/config";
import styles from '../../styles/Problem.module.scss';
import { eq } from "../../utilities/equals";

type ProblemDisplay = {
    id: number,
    parent: string,
    parentIndex: number,
    statement: string,
    tags: Array<string>,
    imageSource: string
};

// LATER: See if this file makes sense to have here, the url path should be "problems", not "problem". For now is fine
// See if we can use Cards
export default function ProblemList({ problems }: { problems: Array<ProblemDisplay> }) {
    const solvedProblemIds: Array<number> = useSolvedProblemsList();
    return (
        // adjust with flex as that is more responsive
        <PageWrapNav stickyNav>
            <div
                style={{
                    // padding or margin?
                    paddingLeft: "4rem",
                    paddingRight: "4rem",
                    paddingBottom: "10rem"
                }}>
                <h1
                    style={{
                        textAlign: "center"
                    }}>
                    PROBLEMS
                </h1>
                <ProblemsWithParents
                    problems={problems}
                    solvedIds={solvedProblemIds} />
            </div>
        </PageWrapNav>
    )
}

const ProblemsWithParents = ({ problems, solvedIds }:
    {
        problems: Array<any>,
        solvedIds: Array<number>
    }) => {
    const parents: Set<string> = new Set();
    problems.forEach(
        (problem: any) => parents.add(problem.parent));

    // just display it however, doesn't really matter right now, later we can improve after launch
    return (<>
        {
            [...parents].map((parent: string, idx: number) => {
                const problemFiltered =
                    // see if there is better filtering like in Java
                    problems
                        .filter(problem => problem.parent == parent); // for testing multiple problems on a grid UI, remove this filter
                const solvedIdsFiltered =
                    solvedIds.filter(id => problemFiltered.some(problem => problem.id == id));
                return (
                    <div
                        key={idx}
                        style={{
                            paddingTop: "2rem",
                            paddingBottom: "4rem"
                        }}>
                        <ProblemGroupDisplay
                            title={parent}
                            problems={problemFiltered}
                            solvedIds={solvedIdsFiltered}
                        />
                    </div>
                );
            })
        }
    </>);
}

const ProblemGroupDisplay = ({ title, problems, solvedIds }: any) => {
    const sortedProblems: Array<any> =
        problems.sort((p1: any, p2: any) => {
            const p1Index: number = p1.parentIndex;
            const p2Index: number = p2.parentIndex;

            if (p1Index > p2Index) {
                return 1;
            } else if (p2Index > p1Index) {
                return -1;
            } else {
                // same
                return 0;
            }
        });

    return (<>
        <h2>
            {title && title.length > 0 ? title : "Miscellaneous"}
        </h2>
        <div
            className={styles.gridContainer}>
            {
                sortedProblems.map(
                    (problem: any) => (
                        <DisplayBoard
                            statement={problem.statement || ""}
                            key={problem.id}
                            problemNumber={problem.id}
                            isSolved={
                                solvedIds.some(
                                    (id: number) => (id == problem.id))}
                            tags={problem.tags}
                            imageSource={problem.imageSource} />
                    )
                )
            }
        </div>
    </>);
};

const DisplayBoard = ({ statement, problemNumber, isSolved, tags, imageSource }:
    { statement: string, problemNumber: number, isSolved: boolean, tags: Array<string>, imageSource: string }) => {
    const imageAddress =
        "https://images.unsplash.com/photo-1654793182455-83e2a50f3494?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";
    return (<>
        {/* Nice trick for hover on the spot, absolute elements inside a relative one */}
        <div className={styles.gridItem}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: "0.3rem" // this gap is when there are multiple tags
                }}>
                {/* LATER: Trim tags later as there can be many of them, have it scrollable */}
                {tags && tags.map(tag => (<Tag key={tag} name={tag} />))}
            </div>
            {/* Need to add Link in the bottom most element, not at top */}
            <Link
                href={"/problem/" + problemNumber?.toString()}>
                {/* LATER: Image from next/link is not expanding, see what's the issue there, 
                maybe add expanding class on `<a>` element instead? and keep `Image` element just separate */}
                <a>
                    <ProblemImage
                        imageSource={imageSource}
                        isSolved={isSolved} />
                </a>
            </Link>
            <div style={{
                paddingTop: "1rem",
                overflow: "scroll",
                maxHeight: "5rem"
            }}>
                {/* try to have max 2 lines */}
                <p
                    style={{
                        //textAlign: "center"
                    }}>
                    {statement}
                </p>
            </div>
        </div>
    </>);
}

const ProblemImage = ({ imageSource, isSolved }:
    {
        imageSource: Readonly<string>,
        isSolved: Readonly<boolean>
    }) => {
    const DEFAULT_IMAGE_SOURCE: Readonly<string> = '/images/88888888.png';

    return (
        <>
            <div
                style={{
                    boxShadow: isSolved ? "0 0 5px 5px green" : ""
                }}
                className={styles.imageContainer}>
                <Image
                    src={imageSource || DEFAULT_IMAGE_SOURCE}
                    alt={"chess position image"}

                    width={"100%"}
                    height={"100%"}
                    objectFit='cover'
                    layout='responsive'

                    placeholder="blur"
                    blurDataURL={DEFAULT_IMAGE_SOURCE}

                    loading="lazy"
                />
            </div>
        </>
    );
}

// cannot use useContext here it seems
// not static props as it is diff for all users - is it though? TODO: solved problems can be rendered client side - see how to do in nextJS. ISG?
export async function getStaticProps() {
    const data: Array<number> = await
        fetch(BACKEND + '/problems')
            .then(res => res.json())
            .catch(error => {
                //console.log(error);
                return [];
            });
    // can we bulk fetch all problems from server?
    const list = await
        Promise.all(
            data.map(async (id) => (await fetchProblem(id)).data()));
    const filteredList =
        list.filter((p: any) => !eq(undefined, p) && !eq(undefined, p.id));
    const castedList: Array<ProblemDisplay> =
        filteredList.map((p: any) => ({
            // LATER: find a better way to use fallback values
            id: p.id,
            parent: p.parent || null,
            parentIndex: p.parentIndex || null,
            statement: p.statement || "",
            tags: p.tags || [],
            imageSource: p.imageSource || ""
        }));

    return {
        props: { problems: castedList }
    }
}

// firebase may have auth error here: https://stackoverflow.com/questions/69511029/firebase-throws-insufficient-permissions-when-using-getserversideprops-in-my-nex
// so just be careful while setting up firebase fetches whether u need auth or nots
// also cannot use use context here easily: https://stackoverflow.com/questions/72211596/how-can-i-use-context-api-and-getserversideprops-in-next-js
async function fetchProblem(id: number) {
    //console.log("fetching data");
    const res = await getDoc(getProblemDocument(id.toString()));
    return res;
}


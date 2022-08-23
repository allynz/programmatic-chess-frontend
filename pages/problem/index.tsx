import { getDoc } from "firebase/firestore";
import Link from "next/link";
import { useContext } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import PageWrapNav from "../../components/navbar/pageWrapper";
import UserContext from "../../contexts/UserContext";
import { getProblemDocument, getSolvedProblemsDocument } from "../../firebase/config";
import styles from '../../styles/Problem.module.scss';

// TODO: See if this file makes sense to have here, the url path should be "problems", not "problem"
// See if we can use Cards
// TODO: Update UI for solved problems
export default function ProblemList({ problems }: { problems: Array<any> }) {
    const solvedProblemIds: Array<number> = getSolvedProblemsList();
    return (
        // adjust with flex as that is more responsive
        <PageWrapNav stickyNav>
            <div>
                <ProblemsWithParents
                    problems={problems}
                    solvedIds={solvedProblemIds} />
            </div>
        </PageWrapNav>
    )
}

const ProblemsWithParents = ({ problems, solvedIds }: { problems: Array<any>, solvedIds: Array<number> }) => {
    const parents: Set<string> = new Set();
    const problemParents = problems.forEach(
        (problem: any) => parents.add(problem.parent));

    // just display it however, doesn't really matter right now, later we can improve after launch
    return (<>
        {
            [...parents].map((parent: string) => (
                // key cannot be undefined so take care of that, TODO: Shift to a separate variable
                <div key={parent && parent.length > 0 ? parent : "Miscellaneous"}>
                    <strong>{parent && parent.length > 0 ? parent : "Miscellaneous"}</strong>
                    <div className={styles.gridContainer}>
                        {
                            problems
                                .filter(
                                    (problem: any) => problem.parent == parent)
                                .map(
                                    (problem: any) => (
                                        <DisplayBoard
                                            key={problem.id}
                                            problemNumber={problem.id}
                                            isSolved={
                                                solvedIds.some(
                                                    (id: number) => (id == problem.id))} />
                                    ))
                        }
                    </div>
                </div>
            ))
        }
    </>);
}

const DisplayBoard = ({ problemNumber, isSolved }: { problemNumber: number, isSolved: boolean }) => {
    const imageAddress =
        "https://images.unsplash.com/photo-1654793182455-83e2a50f3494?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";

    return (<>
        {/* Nice trick for hover on the spot, absolute elements inside a relative one */}
        <div className={styles.gridItem}>
            {/* Need to add Link in the bottom most element, not at top */}
            <Link href={"/problem/" + problemNumber?.toString()}>
                {/* Image from next/link is not expanding, see what's the issue there */}
                <a>
                    <img
                        style={{
                            boxShadow: isSolved ? "0 0 5px 5px green" : ""
                        }}
                        className={styles.expanding}
                        height="100%"
                        width="100%"
                        src="/images/88888888.png" />
                </a>
            </Link>
        </div>
    </>);
}

export const getSolvedProblemsList = (): Array<number> => {
    const user = useContext(UserContext);
    if (!user) {
        return [];
    }

    const docRef = getSolvedProblemsDocument(user?.uid || "dummy");
    // useDocumentData updates again on receiving so it's better than useOnce hook
    // but it's a hook so more reads I guess
    const [value, loading, error] = useDocumentData(docRef);

    if (value) {
        return value?.solvedProblemIds
            .map((p: string) => Number.parseInt(p)) || [];
    } else {
        return [];
    }
}

// cannot use useContext here it seems
// not static props as it is diff for all users - is it though? solved problems can be rendered client side - see how to do in nextJS
export async function getServerSideProps() {
    const data: Array<number> = await
        fetch('https://programmatic-chess.uc.r.appspot.com/problems')
            .then(res => res.json())
            .catch(error => {
                console.log(error);
                return [];
            });
    const list = await
        Promise.all(
            data.map(async (id) => (await fetchProblem(id)).data()));

    return {
        props: { problems: list }
    }
}

async function fetchProblem(id: number) {
    return await getDoc(getProblemDocument(id.toString()));
}

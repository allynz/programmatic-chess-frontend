import Image from "next/image";
import Link from "next/link";
import PageWrapNav from "../../components/general/pageWrapper";
import styles from '../../styles/Problem.module.scss';

// TODO: See if this file makes sense to have here, the url path should be "problems", not "problem"
// See if we can use Cards
// TODO: Update UI for solved problems
export default function ProblemList({ problems }: any) {
    return (
        // adjust with flex as that is more responsive
        <PageWrapNav stickyNav>
            <div className={styles.gridContainer}>
                {
                    problems.map((p: number) => (
                        <DisplayBoard key={p} problemNumber={p} />
                    ))
                }
            </div>
        </PageWrapNav>
    )
}

export async function getStaticProps() {
    const data = Array.from(Array(100).keys());

    return {
        props: { problems: data }
    }
}

const DisplayBoard = ({ problemNumber }: any) => {
    const imageAddress =
        "https://images.unsplash.com/photo-1654793182455-83e2a50f3494?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";

    return (<>
        {/* Nice trick for hover on the spot, absolute elements inside a relative one */}
        <div className={styles.gridItem}>
            {/* Need to add Link in the bottom most element, not at top */}
            <Link href={"/problem/" + problemNumber.toString()}>
                {/* Image from next/link is not expanding, see what's the issue there */}
                <img
                    className={styles.expanding}
                    height="100%"
                    width="100%"
                    src="/images/88888888.png" />
            </Link>
        </div>
    </>);
}

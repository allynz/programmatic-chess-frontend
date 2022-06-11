
// TODO: Compare const vs this function approach

import Link from "next/link";
import { getFirestoreProblemCollectionData } from "../../firebase/hook";
import styles from '../../styles/Problem.module.css'
// Bootstrap styles on next page are causing weird transition from problems page to next, just import it throughout
import 'bootstrap/dist/css/bootstrap.min.css'; // see where to actually include this file - app.js or here for access to whole app

// TODO: See if this file makes sense to have here, the url path should be "problems", not "problem"
export default function ProblemList({ problems }: any) {
    const imageAddress = "https://images.unsplash.com/photo-1654793182455-83e2a50f3494?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";
    return (<div>
        <div className={styles.nav}>Problem Nav</div>
        <div className={styles.gridContainer}>
            {
                problems.map((p: Number) =>
                    <div className={styles.gridItem}>
                        <Link href={"/problem/" + p.toString()}>
                            <img
                                height="300rem"
                                width="200rem"
                                src={imageAddress}></img>
                        </Link>
                    </div>)
            }
        </div>
    </div>)
}

export async function getStaticProps() {
    const reqDef = [1, 2, 3, 4, 5];

    const data = Array.from(Array(100).keys());

    return {
        props: { problems: data }
    }
}

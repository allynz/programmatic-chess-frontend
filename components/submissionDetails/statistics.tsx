import { DocumentData } from "firebase/firestore";
import { Button, Table } from "react-bootstrap";
import styles from '../../styles/Table.module.css';
import { parseSubmissionStats } from "./parsers/submissionStats";

/* For stats of the submission */
const SubmissionStats = ({ doc }: { doc: DocumentData }) => {
    const statsList = parseSubmissionStats(doc);

    return (
        <table className={styles.table}>
            {/* Important to add tbody as validateDOMNesting issue otherwise */}
            <tbody>
                {
                    // cannot nest <tr> in a separate element as hydration nesting issues
                    statsList && statsList.map(({ key, val }: any) => (
                        // Use a better key for ordering
                        <tr key={key}>
                            <th className={styles.th}>{key}</th>
                            <td className={styles.td}>{val}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};

export default SubmissionStats;
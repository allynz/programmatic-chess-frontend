import { Timestamp } from "firebase/firestore";
import Link from "next/link";
import { Table } from "react-bootstrap";
import styles from '../../styles/Table.module.css';

// table has some issues with reloading so have to restart it everytime with npm run devs, see if hydration issues will solve it
// color success in green, and unsuccess in red
// TODO: Think about pagination or infinite scrolling, as with large no. of submissions I won't be able to keep up
export function SubmissionTable({ submissionList }: { submissionList: Array<any> }) {
    if (!submissionList || submissionList.length === 0) {
        return (
            <strong>
                Make a submission to view it's status here!!
            </strong>
        );
    }

    return (<>
        <Table
            style={{
                borderCollapse: "separate",
                borderSpacing: "0"
            }}
            striped bordered hover>
            <thead
                style={{
                    position: "sticky",
                    top: "0", // learn more about this
                    backgroundColor: "grey",
                    border: "1rem solid"
                }}>
                <tr>
                    {
                        // Find a better way than this
                        submissionMap('')
                            .map((vv, idx) => (
                                <th key={idx}>
                                    {vv.key}
                                </th>
                            ))
                    }
                </tr>
            </thead>
            <tbody>
                {submissionList
                    &&
                    submissionList.map((submission: any, idx) => {
                        const mp = submissionMap(submission);
                        return (
                            <tr key={submission?.id || idx}>
                                {
                                    mp.map((vv, idx) => (
                                        <td key={idx}>
                                            {vv.value()}
                                        </td>
                                    ))
                                }
                            </tr>
                        );
                    })}
            </tbody>
        </Table>
    </>);
}

const submissionMap = (submission: any): Array<{ key: string, value: () => JSX.Element }> => [
    {
        key: 'Submission Id',
        value: () => {
            const id = submission.id;

            {/* convert to spinner when link clicked */ }
            {/* use encodeURIComponent, use URI rather than string for URL generation */ }
            {/* convert whole row to link */ }
            return (
                <Link href={"/submission/" + id}>
                    <p className={styles.submissionId}>
                        {id}
                    </p>
                </Link>
            );
        }
    },
    {
        /* return status here rather than just string, render the status itself */
        key: 'Status',
        value: () => {
            return (<>{submission.status}</>);
        }
    },
    {
        key: 'Time (ms)',
        value: () => <>{submission.time}</>
    },
    {
        key: 'Memory (KB)',
        value: () => <>{submission.memory}</>
    },
    {
        key: 'Submission Time',
        value: () => {
            return (<>
                {
                    // set different display alternatives
                    submission.timestamp.submitted ?
                        (submission.timestamp.submitted as Timestamp).toDate().toUTCString() :
                        0
                }
            </>);
        }
    }
];
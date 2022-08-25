import { Timestamp } from "firebase/firestore";
import Link from "next/link";
import { Table } from "react-bootstrap";
import styles from './Table.module.scss';

// table has some issues with reloading so have to restart it everytime with npm run devs, see if hydration issues will solve it
// color success in green, and unsuccess in red
// TODO: Think about pagination or infinite scrolling, as with large no. of submissions I won't be able to keep up
export function SubmissionTable({ submissionList }: { submissionList: Array<any> }) {
    if (!submissionList || submissionList.length === 0) {
        return (
            <strong className={`centered-container fit-container`}>
                {`Make a submission to view it's status here!`}
            </strong>
        );
    }

    return (<>
        <Table
            className={styles.table}
            striped bordered hover>
            <thead>
                <tr>
                    {
                        // Find a better way than this later
                        submissionMap('').map((vv, idx) =>
                            (<th key={idx}>{vv.key}</th>))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    submissionList.map((submission: any, idx) => {
                        const mp = submissionMap(submission);
                        return (
                            <tr key={submission?.id || idx}>
                                {
                                    mp.map((vv, idx) =>
                                        (<td key={idx}>{vv.value()}</td>))
                                }
                            </tr>
                        );
                    })
                }
            </tbody>
        </Table>
    </>);
}

const submissionMap = (submission: any):
    Array<{
        key: string,
        value: () => JSX.Element
    }> => [
        {
            key: 'Submission Id',
            value: () => {
                const id = submission.id;
                return (
                    <Link href={"/submission/" + id}>
                        {/* Wrapping in <a> is imp otherwise wont behave like a link */}
                        <a>
                            <p className={styles.submissionId}>
                                {id}
                            </p>
                        </a>
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
            // Problem name seems better but ok for now
            key: 'Problem Id',
            value: () => {
                const id = submission.problemId;
                return (
                    <Link href={"/problem/" + id}>
                        {/* Wrapping in <a> is imp otherwise wont behave like a link */}
                        <a>
                            <p className={styles.submissionId}>
                                {id}
                            </p>
                        </a>
                    </Link>
                );
            }
        },
        {
            key: 'Submission Time',
            value: () => <TimeDisplay time={submission.timestamp?.submitted} />
        },
        {
            key: 'Completion time',
            value: () => <TimeDisplay time={submission.timestamp.completed} />
        }
    ];

// extract this out
export const TimeDisplay = ({ time }: any) => {
    if (!time) {
        return (<>Not available</>);
    }

    const timestamp: Timestamp = time;
    if (time.seconds && time.nanoseconds) {
        // had to do it like this as Firebase won't recognize it's own type, hence I cannot use any of it's functions(like toDate etc.)
        const date: Readonly<string> =
            new Timestamp(
                timestamp.seconds,
                timestamp.nanoseconds)
                .toDate()
                .toLocaleString();

        return (<>{date}</>);
    } else if (time === 'WAITING') {
        return (<>WAITING...</>);
    } else {
        return (<>Not available</>);
    }
}
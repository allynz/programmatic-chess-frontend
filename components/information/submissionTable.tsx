import { Table } from "react-bootstrap";
import { Timestamp } from "firebase/firestore";

// order fields as per priority - details of status should come first
// Keep head sticky if you can
// table has some issues with reloading so have to restart it everytime with npm eun devs, see if hydration issues will solve it
// it does not have state right now, so on reloading table is again at top, we can change that if we want
// add overflow scroll to the elements inside
// submission table shifts appropriately if any submission updates, see if that can be an issue
// color success in green, and unsuccess in red
export function SubmissionTable({ submissionList }: any) {
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
                    <th>Submission Id</th>
                    <th>Submission Time</th>
                    <th>Problem</th>
                    <th>Status</th>
                    <th>Time Taken</th>
                    <th>Memory Used</th>
                </tr>
            </thead>
            <tbody>
                {console.log("slist", submissionList)}
                {submissionList && submissionList.map((submission: any) => (
                    //{ console.log("sub", submission) }
                    <tr>
                        <td>{submission.userId}</td>
                        <td>{
                            // set different display alternatives
                            submission.timestamp.submitted ?
                                (submission.timestamp.submitted as Timestamp).toDate().toUTCString() :
                                0
                        }</td>
                        <td>{submission.problemId}</td>
                        <td>{submission.status}</td>
                        <td>{submission.time}</td>
                        <td>{submission.memory}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </>);
}
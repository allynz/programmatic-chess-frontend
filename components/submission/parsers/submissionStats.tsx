import { DocumentData } from "firebase/firestore";
import { eq } from "lodash";
import { TimeDisplay } from "../../information/submissionTable";

// add links to goto respective links like problem page etc.
export const parseSubmissionStats = (data: DocumentData) => {

    // make sure to have spaces in values so overflow can be handles easily
    // TODO: Later See if we can add hooks here, without overflowing read/write limits
    // TODO: Have a spinner next to waiting status, also same in Submissions Table
    const res = [
        {
            key: "Submission Id",
            val: data.id
        },
        {
            key: "Submitted On",
            val: <TimeDisplay time={data.timestamp?.submitted} />
        },
        {
            key: "Completed On",
            val: <TimeDisplay time={data.timestamp?.completed} />
        },
        {
            key: "Time Taken",
            val: data.time
        },
        {
            key: "Memory Used",
            val: data.memory
        },
        {
            key: "Status",
            val: data.status
        },
        {
            // hide sensitive info in compilation error etc.
            key: "Status Details",
            val: (
                <textarea
                    readOnly
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                    value={data.errorMessage}>
                </textarea>
            )
        },
        {
            key: "Test cases Passed",
            val: getPassedTestCases(data.testCaseDetails)
        },
        {
            key: "Test cases Failed",
            val: getFailedTestCases(data.testCaseDetails)
        }
    ];

    return res;
};

// TODO: Find a better way for these calculations
const getPassedTestCases = (testCasesData: any): number => {
    if (!testCasesData
        || eq(testCasesData, undefined)
        || eq(testCasesData, null)) {
        return 0;
    }

    let cnt = 0;
    let i = 1;
    while (true) {
        if (testCasesData[i]) {
            cnt += (testCasesData[i].status == "SUCCESS" ? 1 : 0);
        } else {
            break;
        }
        i++;
    }

    return cnt;
};

const getFailedTestCases = (testCasesData: any): number => {
    if (!testCasesData
        || eq(testCasesData, undefined)
        || eq(testCasesData, null)) {
        return 0;
    }

    let cnt = 0;
    let i = 1;
    while (true) {
        if (testCasesData[i]) {
            cnt += (testCasesData[i].status == "SUCCESS" ||
                testCasesData[i].status == "WAITING"
                ? 0 : 1);
        } else {
            break;
        }
        i++;
    }

    return cnt;
};
import { DocumentData } from "firebase/firestore";
import { eq } from "lodash";
import Link from "next/link";
import { TimeDisplay } from "../../information/submissionTable";

// add links to goto respective links like problem page etc.
export const parseSubmissionStats = (data: DocumentData) => {

    // make sure to have spaces in values so overflow can be handles easily
    // LATER: Later See if we can add hooks here, without overflowing read/write limits
    // LATER: Have a spinner next to waiting status, also same in Submissions Table. For now is fine
    // LATER: Have same structure for this and `My Submissions` page, and better design for that
    const res = [
        {
            key: "Submission Id",
            val: data.id
        },
        {
            key: "Status",
            val: data.status // maybe we can have a link to the about section?
        },
        {
            key: "Time Taken (ms)",
            val: data.time
        },
        {
            key: "Memory Used (KB)",
            val: data.memory
        },
        {
            key: "Problem Id",
            val: (
                <Link href={"/problem/" + data.problemId}>
                    {/* Wrapping in <a> is imp otherwise wont behave like a link */}
                    <a style={{
                        color: "blue",
                        textDecoration: "underline"
                    }}>
                        {data.problemId}
                    </a>
                </Link>
            )
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
            // hide sensitive info in compilation error etc.
            key: "Status Details",
            val: (
                <textarea
                    readOnly
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                    // TODO: Check if this is correct or not, should be just `message`? Check with backend
                    value={data.errorMessage || data.message}>
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

// LATER: Find a better way for these calculations
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
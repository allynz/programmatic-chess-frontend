import { DocumentData } from "firebase/firestore";

export const parseSubmissionStats = (data: DocumentData) => {
    //data = JSON.parse(data);

    const res = [
        {
            key: "SubmissionId",
            val: data.id
        },
        {
            key: "Submitted On",
            val: JSON.stringify(data.timestamp.submitted)
        },
        {
            key: "Completed On",
            val: JSON.stringify(data.timestamp.completed)
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
            key: "Test cases Passed",
            val: getPassedTestCases(data.testCaseDetails)
        },
        {
            key: "Test cases failed",
            val: getFailedTestCases(data.testCaseDetails)
        }
    ];

    return res;
};

// TODO: Find a better way for these calculations
const getPassedTestCases = (testCasesData: any): number => {
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
import { DocumentData } from "firebase/firestore";
import TestCases from "./testCasesAccordion/testCases";

export type TestCaseDocument = {
    input: Array<string>,
    output: Array<string>,
    message: string,
    status: string,
    board: string
};

type Props = {
    doc: DocumentData;
};

// LATER: Add Test case status detail also in wrapper. Seems extra right now
const TestCasesWrapper = ({ doc }: Props) => {
    const testCases: Array<TestCaseDocument> =
        doc.testCaseDetails ?
            getTestCaseList(doc.testCaseDetails) :
            [];

    if (!testCases || testCases.length == 0) {
        return (<></>);
    }

    return (<>
        <div
            style={{
                backgroundColor: "white",
                width: "100%"
            }}>
            <div
                style={{
                    backgroundColor: "green",
                    color: "white",
                    fontSize: "large",
                    textAlign: "center",
                    paddingTop: "0.2rem",
                    paddingBottom: "0.2rem",
                    fontWeight: "500"
                }}>
                Test Case Details
            </div>
            <TestCases arr={testCases} />
        </div>

        {/* Bottom filler div */}
        <div style={{ height: "30rem" }} />
    </>);
}

const getTestCaseList = (testCaseDetails: any): Array<TestCaseDocument> => {
    const res: Array<TestCaseDocument> = [];
    let i = 1;
    while (true) {
        if (testCaseDetails[i]) {
            res.push(testCaseDetails[i]);
        } else {
            break;
        }

        i++;
    }

    return res;
}

export default TestCasesWrapper;
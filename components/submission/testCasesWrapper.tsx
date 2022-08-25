import { DocumentData } from "firebase/firestore";
import TestCases from "./testCasesAccordion/testCases";

export type TestCaseDocument = {
    input: Array<string>,
    output: Array<string>,
    memory: number,
    message: string,
    status: string,
    time: number,
    board: string
}

type Props = {
    doc: DocumentData;
};

// TODO: Add Test case status detail also in wrapper
const TestCasesWrapper = ({ doc }: Props) => {
    const testCases: Array<TestCaseDocument> =
        doc.testCaseDetails ? getTestCaseList(doc.testCaseDetails) : [];

    return (<>
        <div
            style={{
                backgroundColor: "white",
                width: "100%"
            }}>
            <div>Test Case Details</div>
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
import { DocumentData } from "firebase/firestore";
import TestCasesAccordion from "./testCasesAccordion";

// https://stackoverflow.com/questions/57510552/react-prop-types-with-typescript-how-to-have-a-function-type
type Props = {
    doc: DocumentData;
};

export type TestCaseDocument = {
    input: Array<string>,
    output: Array<string>,
    memory: number,
    message: string,
    status: string,
    time: number
}

// /* Div for test case details view */
// See if you wanna keep the height constant as on opening and closing there is some issue
// Change it based on status of submission also
// Same eventkeybindings can open and close multiple elements simultaneously, WOW!s
// TODO: Have some gap below so testcases are visible without much hindrance
// TODO: See how to scroll up page accordion when opening rather than go down
// TODO: Have collapse all acoordion option - maybe difficult though, try to use useAccordianButton
const TestCaseDetailElement = ({ doc }: Props) => {
    const testCases: Array<TestCaseDocument> =
        getTestCaseNumbers(doc.testCaseDetails);

    return (<>
        <div
            style={{
                backgroundColor: "white",
                width: "100%"
            }}>
            <TestCasesAccordion arr={testCases} />
        </div>
        <div style={{ height: "30rem" }}>

        </div>
    </>);

    // return (<>
    //     <div
    //         style={{
    //             backgroundColor: "white",
    //             width: "100%"
    //         }}>
    //         <Accordion
    //             defaultActiveKey={testCases.map(t => t.toString())}
    //             alwaysOpen>
    //             {
    //                 testCases.map((testCase) => (
    //                     // TODO: verify key for list
    //                     <Accordion.Item key={testCase} eventKey={testCase.toString()}>
    //                         <Accordion.Header>{testCase}</Accordion.Header>
    //                         <Accordion.Body
    //                             style={{
    //                                 padding: "0px", // overriding default
    //                                 display: "grid",
    //                                 gridTemplateColumns: "90% 10%",
    //                                 gridTemplateRows: "100%"
    //                             }}>
    //                             <TestCaseDetail data={doc.testCaseDetails[testCase]} />
    //                             <div style={{ aspectRatio: "1/1" }}>3423</div>
    //                         </Accordion.Body>
    //                     </Accordion.Item>
    //                 ))
    //             }
    //         </Accordion>
    //     </div>
    // </>);
}

// Single test case details collapsable
// Do better type checking
const TestCaseDetail = ({ data }: any) => {
    return (<>
        {data.status}
    </>);
}

const getTestCaseNumbers = (testCaseDetails: any): Array<TestCaseDocument> => {
    //console.log(testCaseDetails);
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

export default TestCaseDetailElement;
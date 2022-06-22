import { DocumentData } from "firebase/firestore";
import { Accordion } from "react-bootstrap";

// https://stackoverflow.com/questions/57510552/react-prop-types-with-typescript-how-to-have-a-function-type
type Props = {
    doc: DocumentData;
};

// /* Div for test case details view */
// See if you wanna keep the height constant as on opening and closing there is some issue
// Change it based on status of submission also
// Same eventkeybindings can open and close multiple elements simultaneously, WOW!s
const TestCaseDetailElement = ({ doc }: Props) => {
    const testCases: Array<number> =
        getTestCaseNumbers(doc.testCaseDetails);

    return (<>
        <div
            style={{
                backgroundColor: "white",
                width: "100%"
            }}>
            <Accordion
                defaultActiveKey={testCases.map(t => t.toString())}
                alwaysOpen>
                {
                    testCases.map((testCase) => (
                        // TODO: verify key for list
                        <Accordion.Item key={testCase} eventKey={testCase.toString()}>
                            <Accordion.Header>{testCase}</Accordion.Header>
                            <Accordion.Body
                                style={{
                                    padding: "0px", // overriding default
                                    display: "grid",
                                    gridTemplateColumns: "90% 10%",
                                    gridTemplateRows: "100%"
                                }}>
                                <TestCaseDetail data={doc.testCaseDetails[testCase]} />
                                <div style={{ aspectRatio: "1/1" }}>3423</div>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))
                }
            </Accordion>
        </div>
    </>);
}

// Single test case details collapsable
// Do better type checking
const TestCaseDetail = ({ data }: any) => {
    return (<>
        {data.status}
    </>);
}

// Displays list data
const ListDisplayElement = ({ data }: any) => {

};

const getTestCaseNumbers = (testCaseDetails: any): Array<number> => {
    let res = [];
    let i = 1;
    while (true) {
        if (testCaseDetails[i]) {
            res.push(i);
        } else {
            break;
        }

        i++;
    }

    return res;
}

export default TestCaseDetailElement;
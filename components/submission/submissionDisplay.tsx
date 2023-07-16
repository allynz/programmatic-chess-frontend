import SubmissionCode from "../../components/submission/code";
import SubmissionStats from "../../components/submission/statistics";
import { useSubmissionDocument } from "./hooks/useSubmissionDocument";
import TestCasesWrapper from "./testCasesWrapper";

// Test that no hooks are there, only display info
const SubmissionDisplay = ({ id }: any) => {
    const doc = useSubmissionDocument(id);

    return (<>
        <div
            style={{
                width: "100%",
                backgroundColor: "yellow"
            }}>

            {/* Div for editor + status */}
            <div
                style={{
                    backgroundColor: "white",
                    // keep height fixed otherwise infinite expanding issue happens
                    height: "40rem",
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "70% 30%",
                    gridTemplateRows: "100%",
                    // make it work with scroll
                    overflow: "clip"
                }}>
                <Display text="Source Code">
                    <SubmissionCode id={id} />
                </Display>
                <Display text="Submission Details">
                    <SubmissionStats doc={doc} />
                </Display>
            </div>

            <br></br>

            <TestCasesWrapper doc={doc} />
        </div>
    </>);
}

export default SubmissionDisplay;

// Stack display for 2 elements
const Display = ({ text, children }: any) => {
    return (<>
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "grid",
                gridTemplateRows: "5% 95%",
                gridTemplateColumns: "100%"
            }}>
            <div
                style={{
                    width: "fit-content",
                    color: "white",
                    fontSize: "large",
                    fontWeight: "500",
                    backgroundColor: "green",
                    textAlign: "center",
                    marginLeft: "1rem",
                    paddingLeft: "1rem",
                    paddingRight: "1rem"
                }}>
                {text}
            </div>
            {children}
        </div>
    </>);
}
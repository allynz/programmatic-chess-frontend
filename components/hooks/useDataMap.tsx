import { useContext } from "react";
import ReactMarkdown from "react-markdown";
import UserContext from "../../contexts/UserContext";
import PlaygroundBoard from "../chessboard/playground/boardWrapper";
import SubmissionList from "./submissionList";

// should be a functional component or react hook, as it is using user data - which we can pass from caller if needed
export const useDataMap = (problem: any):
    // it is modifiable hence not readonly
    Array<{
        key: string,
        renderContent: JSX.Element
    }> => {
    const user = useContext(UserContext);

    // this hook should be present all the time since beginning of pageload, we only modify its params otherwise it causes errors
    // make sure this hook is initialised even when doing CSR in Nav, as we cannot add new hooks during runtime probably
    const submissionData = SubmissionList(problem.id);

    const dataMap = [
        {
            key: "problem",
            renderContent: <ReactMarkdown>{problem.statement}</ReactMarkdown>
        },
        {
            key: "solution",
            renderContent: <ReactMarkdown>{problem.solution}</ReactMarkdown>
        }
    ];

    if (problem.pieces && problem.pieces.length > 0) {
        dataMap.push(
            {
                key: "playground",
                renderContent: <PlaygroundBoard pieces={problem.pieces} />
            }
        );
    }

    // Test this in the end also
    if (user) {
        if (!dataMap.find(val => val.key === 'submissions')) {
            dataMap.splice(2, 0, {
                // maybe better key would be 'my submissions' as current key could be confused with all submissions by all users etc.
                // have a note in the body to clarify this, and hide unnecessary fields
                key: "submissions",
                renderContent: submissionData // it does update even in const var, wow! Well const is differnt from Object.freeze
            });
        }
    } else {
        const submissionsIndex = dataMap.findIndex(val => val.key === "submissions");
        if (submissionsIndex > -1) {
            dataMap.splice(submissionsIndex, 1);
        }
    }

    return dataMap;
}


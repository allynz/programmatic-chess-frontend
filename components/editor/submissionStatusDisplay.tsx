import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import Submission from "../hooks/submission";

type Props = {
    submissionId: string,
    displayError: string
};

// LATER: Make it global across all files
const EMPTY_SUBMISSION_ID: Readonly<string> = "empty document";

const LatestSubmissionDisplay = ({ submissionId, displayError }: Props) => {
    return (
        <div
            style={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
            <LatestSubmissionDetails
                submissionId={submissionId}
                displayError={displayError} />
        </div>
    );
}

export default LatestSubmissionDisplay;

const LatestSubmissionDetails = ({ submissionId, displayError }: Props) => {
    const user = useContext(UserContext);

    // need to persist hook even if user is not present as on sign in the hook must be present
    const hook = Submission(user ? submissionId : EMPTY_SUBMISSION_ID);

    if (user) {
        if (displayError && displayError.length > 0) {
            return (<>
                <p style={{ color: "red" }}>{displayError}</p>
            </>
            );
        } else {
            if (submissionId === EMPTY_SUBMISSION_ID) {
                return (
                    <>
                        Current submission status will be shown here
                        {/* <br />
                        For details of all submissions for this problem,
                        view Submissions Tab on top left Nav links */}
                    </>
                );
            } else {
                return (
                    <div>{'Latest submission status:  '} {hook}</div>
                );
            }
        }
    } else {
        return (
            <strong>
                Submission Status display
            </strong>
        )
    }
};
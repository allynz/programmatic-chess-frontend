import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { getSubmissionDataHook } from "../hooks/displayHooks";

type Props = {
    submissionId: string,
    displayError: string
};

const LastSubmissionDisplay = ({ submissionId, displayError }: Props) => {
    return (
        <div
            style={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
            <LastSubmissionDetails
                submissionId={submissionId}
                displayError={displayError} />
        </div>
    );
}

export default LastSubmissionDisplay;

const LastSubmissionDetails = ({ submissionId, displayError }: Props) => {
    const user = useContext(UserContext);

    // need to persist hook even if user is not present as on sign in the hook must be present
    const hook = getSubmissionDataHook(user ? submissionId : "empty document");

    if (user) {
        if (displayError && displayError.length > 0) {
            return (<>
                <p style={{ color: "red" }}>{displayError}</p>
            </>
            );
        } else {
            if (submissionId === "empty document") {
                return (
                    <>
                        Last submission status will be shown here.
                        <br />
                        For details of all submissions for this problem,
                        view Submissions Tab on top left Nav links
                    </>
                );
            } else {
                return (
                    <>Last submission status: {hook}</>
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
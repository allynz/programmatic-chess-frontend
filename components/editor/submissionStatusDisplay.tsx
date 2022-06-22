import React from "react";
import { getSubmissionDataHook } from "../../firebase/hook";

// make it whole clickable to go to submissions tab if a submission is done and was success in submitting - do it later as it is interaction between components
// the status shown should be the top index in Submissions tab so don't have to hover to it also but we can do if you want: https://stackoverflow.com/questions/7852986/javascript-scroll-to-nth-row-in-a-table
// check how to highlight though
const LastSubmissionDisplay = ({ submissionId }: any) => {
    const hook = getSubmissionDataHook(submissionId);
    return (<>
        <div
            style={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
            {
                submissionId === "empty document" ?
                    <>Last submission status will be shown here.<br />
                        For details of all submissions for this problem, view {/**link to submissions Tab here */}submissions Tab on the left</>
                    :
                    <>Last submission status: {hook}</>
            }
        </div>
    </>);
};

export default LastSubmissionDisplay;
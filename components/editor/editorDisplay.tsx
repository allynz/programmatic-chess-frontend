import React, { useState } from "react";
import SubmissionButton from "./submissionButton";
import LastSubmissionDisplay from "./submissionStatusDisplay";
import ThrottlingDisplay from "./throttlingDisplay";
import VSCodeEditor from "./vscodeEditor";

// TODO: Add no effect on pressing save, it is pretty annoying
// Add more adjustment options to the editor
// Add custom test option also in the ide
// TODO: Add run custom test feature
function EditorDisplay({ problemId, userId }: any) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionId, setSubmissionId] = useState("empty document"); // just don't keep it empty as that throws error
    const [submissionCode, setSubmissionCode] = useState(""); // TODO: bind it with default vscode codes

    // Better to render without any margin and thinking as if you will be rendered in a container
    return (<>
        {/*
        Not much beneft in using Form from react-bootstrap so not using it
        See if you can add more advanced customisation options like vscode(like actual desktop editor), but be careful it should only affect the display, nothing like save actions etc.
        Add a save action also in the editor - like save hotkey should not save the webpage but do nothing I guess
         */}
        <form
            style={{
                display: "grid",
                //alignItems: "stretch",
                height: "100%",
                width: "100%",
                gridTemplateRows: "4% 86% 10%",
                gridTemplateColumns: "100%" // important during resizing
            }}

            onSubmit={
                // is async correct here?
                async (e) => {
                    setIsSubmitting(true);
                    e.preventDefault();

                    // use then().catch etc. if possible
                    const res = await submitForm(
                        submissionCode,
                        userId,
                        problemId
                    );

                    setIsSubmitting(false);
                    setSubmissionId(res);
                }
            }>

            {/* This font is nice, what is it? Also do these comments appear on browser? */}
            <ThrottlingDisplay />

            {/** 
             * TODO: Stop Editor editing when submitting
            */}
            <VSCodeEditor
                updateSubmissionCode={
                    (code: string) => setSubmissionCode(code)
                } />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "30% 70%"
                }}>
                <SubmissionButton isSubmitting={isSubmitting} />
                <LastSubmissionDisplay submissionId={submissionId} />
            </div>

        </form>
    </>);
}

// Optimise this function in case of error scenarios
const submitForm = async (
    submissionCode: string,
    userId: string,
    problemId: string
): Promise<string> => {
    var formData = new FormData();
    formData.append('code', submissionCode);
    // Better to fetch userId and problemId from apis rather than params so I don't have to re-render this widget again, I can just clear the data
    formData.append('userId', userId); // use (e.target as any).userId.value if taking from hiddenInput
    formData.append('problemId', problemId);

    const res = await fetch(
        'http://localhost:8080/submitCode',
        {
            body: formData,
            method: 'POST'
        }
    ).then(async (response) => {
        if (response.ok) {
            const jsonValue = await response.json();
            return jsonValue;
            //ssetSubmissionId(response.body);
        } else {
            console.log("notok", response);
        }
    }).catch((err) => {
        console.log("err");
        console.log("err", err);
    });

    return res;
};

export default EditorDisplay;
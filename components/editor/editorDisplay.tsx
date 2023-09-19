import { User } from "firebase/auth";
import { useContext, useState } from "react";
import BACKEND from "../../configs/hostConfig";
import UserContext from "../../contexts/UserContext";
import { eq } from "../../utilities/equals";
import AuthenticationWrapper from "../auth/authentication";
import { CodeEditorDisplay } from "../submission/code";
import SubmissionButton from "./submissionButton";
import LatestSubmissionDisplay from "./submissionStatusDisplay";
import VSCodeEditor from "./vscodeEditor";

// LATER: Improve waiting symbol in Latest submission display - make it loader. Now is also fine
// If error in solution, mail to my email id
function EditorDisplay({ problemId, readOnly, defaultCode }: any) {
    const EMPTY_SUBMISSION_ID: Readonly<string> = "empty document";

    const user: User | null = useContext(UserContext);

    const [editerMounted, setEditorMounted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // just don't keep it empty as that throws error
    const [submissionId, setSubmissionId] = useState(EMPTY_SUBMISSION_ID);

    // set a size limit probably otherwise it will overflow
    const [submissionCode, setSubmissionCode] = useState(defaultCode || "");
    const [displayError, setDisplayError] = useState("");

    // Rendered without margin, seems better that way
    return (
        <form
            // I like it without padding only, have padding on individual elements
            style={{
                display: "grid",
                height: "100%",
                width: "100%",
                gridTemplateRows: "90% 10%",
                gridTemplateColumns: "100%" // important during resizing
            }}

            onSubmit={
                async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);

                    const subIdResult: {
                        status: string,
                        id: string
                    } = await submitForm(
                        submissionCode,
                        // can do forceRefresh also everytime for better security
                        await user?.getIdToken() || "",
                        problemId
                    );

                    // Make Success Enum
                    if (eq(subIdResult.status, "Success")) {
                        setDisplayError(''); // improve this flow
                        setSubmissionId(subIdResult.id);
                    } else {
                        setDisplayError(subIdResult.status);
                        setSubmissionId('dummy'); // find a good value for this // CHECK: Don't set to empty, otherwise firebase will throw error
                    }

                    setIsSubmitting(false);
                }
            }>

            {/* <>Language: C++</> - add this using grid */}
            {
                readOnly ?
                    <CodeEditorDisplay code={submissionCode} />
                    :
                    <VSCodeEditor
                        onEditorMount={() => setEditorMounted(true)}
                        code={submissionCode}
                        updateSubmissionCode={
                            (code: string) => setSubmissionCode(code)
                        }
                    />
            }
            {
                editerMounted ?
                    <AuthenticationWrapper>
                        <div
                            style={{
                                height: "100%",
                                display: "grid",
                                gridTemplateColumns: "30% 70%",
                                gridTemplateRows: "100%"
                            }}>
                            <SubmissionButton
                                isSubmitting={isSubmitting} />
                            <LatestSubmissionDisplay
                                submissionId={submissionId}
                                displayError={displayError} />
                        </div>
                    </AuthenticationWrapper>
                    :
                    <></>
            }

        </form>);
}

export default EditorDisplay;

// Optimise this function in case of error scenarios
// Try to make this stateless as much as possible
const submitForm = async (
    submissionCode: string,
    userIdToken: string,
    problemId: string
): Promise<{
    status: string,
    id: string
}> => {
    if (!userIdToken || userIdToken.length === 0) {
        return {
            status: "Invalid User, please try logging in again",
            id: ""
        };
    }

    const formData = new FormData();
    formData.append('code', submissionCode);
    formData.append('userIdToken', userIdToken);
    formData.append('problemId', problemId);

    const res = await fetch(
        BACKEND + '/submitCode',
        {
            // directly adding formData has some issues as webkit adds it's own headers in payload
            // use RequestParam in server to resolve this
            body: formData,
            method: 'POST'
        }
    ).then(async (response) => {
        if (response.ok) {
            const jsonValue = await response.json();
            return {
                status: "Success",
                id: jsonValue
            }
        } else {
            // LATER: hack for now to avoid the annoying dump from server, fix later
            if (response.status == 500) {
                return {
                    status: "Server Error, please try again after some time",
                    id: ""
                }
            }

            // LATER: Check this errorText, it should not be obscure which happens sometimes from server when it itself throws exception. Probably we can tokenize on frontend
            const errorText: string = await response.text();

            if (errorText.length > 0) {
                return {
                    status: errorText,
                    id: ""
                }
            } else {
                return {
                    status: "Error, please try again after some time",
                    id: ""
                }
            }
        }
    }).catch((err) => {
        return {
            status: "Error, please try again after some time",
            id: ""
        }
    });

    return res;
};
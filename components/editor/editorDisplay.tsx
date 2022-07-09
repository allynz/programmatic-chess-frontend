import { User } from "firebase/auth";
import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import AuthenticationWrapper from "../auth/authentication";
import SubmissionButton from "./submissionButton";
import LastSubmissionDisplay from "./submissionStatusDisplay";
import ThrottlingDisplay from "./throttlingDisplay";
import VSCodeEditor from "./vscodeEditor";

function EditorDisplay({ problemId }: any) {
    const user: User | null = useContext(UserContext);

    const [isSubmitting, setIsSubmitting] = useState(false);
    // just don't keep it empty as that throws error
    const [submissionId, setSubmissionId] = useState("empty document");
    const [submissionCode, setSubmissionCode] = useState("");
    const [displayError, setDisplayError] = useState("");

    // Rendered without margin, seems better that way
    return (
        <AuthenticationWrapper>
            <form
                // I like it without padding only, have padding on individual elements
                style={{
                    display: "grid",
                    height: "100%",
                    width: "100%",
                    gridTemplateRows: "4% 86% 10%",
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

                        if (subIdResult.status === "Success") {
                            setDisplayError('');
                            setSubmissionId(subIdResult.id);
                        } else {
                            setDisplayError(subIdResult.status);
                        }

                        setIsSubmitting(false);
                    }
                }>

                <ThrottlingDisplay />

                <VSCodeEditor
                    updateSubmissionCode={
                        (code: string) => setSubmissionCode(code)
                    }
                />

                <div
                    style={{
                        height: "100%",
                        display: "grid",
                        gridTemplateColumns: "30% 70%",
                        gridTemplateRows: "100%"
                    }}>
                    <SubmissionButton
                        isSubmitting={isSubmitting} />
                    <LastSubmissionDisplay
                        submissionId={submissionId}
                        displayError={displayError} />
                </div>

            </form>
        </AuthenticationWrapper>);
}

export default EditorDisplay;

// Optimise this function in case of error scenarios
// Try to make this stateless as much as possible
const submitForm = async (
    submissionCode: string,
    userIdToken: string,
    problemId: string
): Promise<
    {
        status: string,
        id: string
    }
> => {
    if (!userIdToken || userIdToken.length === 0) {
        return {
            status: "Invalid User, please try logging again",
            id: ""
        };
    }

    const formData = new FormData();
    formData.append('code', submissionCode);
    formData.append('userIdToken', userIdToken);
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
            return {
                status: "Success",
                id: jsonValue
            }
        } else {
            return {
                status: "Internal error, please try again after some time",
                id: ""
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
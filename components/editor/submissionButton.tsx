import React, { useContext } from "react";
import { Spinner } from "react-bootstrap";
import UserContext from "../../contexts/UserContext";

// https://getcssscan.com/css-buttons-examples
// https://react-bootstrap.github.io/components/buttons/ - see on how to make loading button
const SubmissionButton = ({ isSubmitting }: any) => {
    const user = useContext(UserContext);

    if (isSubmitting) {
        return (
            <button
                style={{
                    height: "100%",
                    width: "100%",
                    overflow: "clip"
                }}
                type="button">
                <Spinner animation="border">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </button>
        );
    } else {
        return (
            <button
                disabled={user === null || user === undefined}
                style={{
                    height: "100%",
                    width: "100%"
                }}
                type="submit">
                SUBMIT
            </button>
        );
    }
};

export default SubmissionButton;
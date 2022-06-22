import React from "react";
import { Spinner } from "react-bootstrap";

const SubmissionButton = ({ isSubmitting }: any) => {
    return (<>
        <div>
            {
                isSubmitting ?
                    <button style={{ height: "100%", width: "100%", overflow: "clip" }} type="button">
                        <Spinner animation="border">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </button>
                    :
                    <button style={{ height: "100%", width: "100%" }} type="submit">SUBMIT</button>
            }
        </div>
    </>);
};

export default SubmissionButton;
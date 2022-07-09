import { Spinner } from "react-bootstrap";

const Loading = () => {
    return (<>
        <div
            style={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto"
            }}>
            {/* Check for better spinner, https://www.npmjs.com/package/react-spinners */}
            <Spinner animation="border" />
        </div>
    </>);
}

export default Loading;
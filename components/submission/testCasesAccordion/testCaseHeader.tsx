import { Accordion } from "react-bootstrap";

// see how to pass callbacks directly from top parent instead of layering functions
const TestCaseHeader = ({
    idx,
    doc
}: any) => {

    // try to control speed of opening accordion also
    return (<>
        <Accordion.Header
            // need to size it as default is way higher than what I need
            // accordian header probably wraps a single button so cannot do grid % sizes here
            style={{
                overflow: "clip",
                height: "2rem",
                display: "grid",
                gridTemplateColumns: "100%",
                gridTemplateRows: "100%"
            }}>
            <div
                style={{
                    display: "grid",
                    width: "100%",
                    gridTemplateColumns: "10% 90%",
                    gridTemplateRows: "100%"
                }}>
                <div>{idx + 1}</div>
                <div
                    // need grid here so all starting position are same for each row irrespective of their values
                    style={{
                        width: "100%",
                        display: "grid",
                        gridTemplateColumns: "40% 30% 30%",
                        gridTemplateRows: "100%"
                    }}>
                    <div>Status: {doc.status}</div>
                    <div>Time(ms): {doc.time}</div>
                    <div>Memory(KB): {doc.memory}</div>
                </div>
            </div>
        </Accordion.Header>
    </>);
}

export default TestCaseHeader;
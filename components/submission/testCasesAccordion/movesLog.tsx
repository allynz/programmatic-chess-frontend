import { ListGroup } from "react-bootstrap";
import { TestCaseDocument } from "../testCasesWrapper";

const MovesLog = ({ doc }: { doc: TestCaseDocument }) => {
    return (<>
        <div
            style={{
                width: "100%",
                height: "100%",
                padding: "1rem"
            }}>

            <div id="moves">
                <>Moves: </>
                <ListGroupElement list={doc.output} />
            </div>

            {/* Can add option to view full as it is without scroll in future */}
            {/* not able to fix scroll issue, tried onWheel - best bet */}
            {/* TODO: See if you want to add indexes to items or have them stack together, one above and below */}
            {/* TODO: Make sure in backed I don't recieve large strings or large array */}
            <div id="mover">
                <>Grader Moves: </>
                {/* Can add option to view full as it is without scroll in future */}
                <ListGroupElement list={doc.input} />
            </div>

            <div id="errorMessage">
                {doc.message}
            </div>

        </div>
    </>);
}

export default MovesLog;

const ListGroupElement = ({ list }: { list: Array<string> }) => {
    if (!list || list.length == 0) {
        // nice solution
        return (<></>);
    }

    return (
        <div
            style={{
                overflow: "scroll",
                whiteSpace: "nowrap",
                boxShadow: "0px 0px 5px 2px lightgreen"
            }}>
            {/* Check out more options in ListGroup */}
            <ListGroup horizontal>
                {
                    // can colour according to result also using variant
                    list &&
                    list.map((val, idx) => (
                        <ListGroup.Item
                            key={idx}
                            style={{
                                height: "3rem",
                                minWidth: "5rem"
                            }}>
                            {val}
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
        </div>
    );
}
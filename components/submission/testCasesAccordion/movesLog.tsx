import { ListGroup } from "react-bootstrap";
import { isValidBoardString } from "../../../chess/utilities";
import { eq } from "../../../utilities/equals";
import { TestCaseDocument } from "../testCasesWrapper";

const MovesLog = ({ doc }: { doc: TestCaseDocument }) => {
    const isProblemChessRelated: boolean = isValidBoardString(doc?.board);

    return (<>
        <div
            style={{
                width: "100%",
                height: "100%",
                padding: "1rem"
            }}>

            <div id="moves">
                {
                    isProblemChessRelated ?
                        <div>Your Moves: </div> :
                        <div>Your Output: </div>
                }
                <ListGroupElement list={doc.output} />
            </div>

            {/* Can add option to view full as it is without scroll in future */}
            {/* not able to fix scroll issue, tried onWheel - best bet */}
            {/* LATER: See if you want to add indexes to items or have them stack together, one above and below */}
            {/* CHECK: Make sure in backed I don't recieve large strings or large array */}
            <div id="mover">
                {
                    isProblemChessRelated ?
                        <div>Opponent's Moves: </div> :
                        <div>Grader Output: </div>
                }
                {/* Can add option to view full as it is without scroll in future */}
                <ListGroupElement list={doc.input} />
            </div>

            <br></br>
            {
                (doc.message && !eq(doc.message, "")) ?
                    (<div id="errorMessage">
                        Message: {doc.message}
                    </div>) :
                    <></>
            }

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
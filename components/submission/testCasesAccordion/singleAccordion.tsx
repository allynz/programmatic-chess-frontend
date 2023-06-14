import { useContext } from "react";
import { Accordion, AccordionContext } from "react-bootstrap";
import { convertBackendBoardToFrontend, getFen, isValidBoardString } from "../../../chess/utilities";
import { eq } from "../../../utilities/equals";
import MovesBoardDisplay from "../../chessboard/movesboard/movesBoardDisplay";
import MovesLog from "./movesLog";
import TestCaseHeader from "./testCaseHeader";

// checks every single accordion on any update, I guess this may be the problem with react, in jquery we have more control on this to go directly there -- is this true though, doesn't seaching for selector also takes time? prob it will be indexed
const SingleAccordion = ({
    idx, doc, eventKey
}: any) => {
    const STARTING_POSITION = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
    const moveList = [
        'start', 'e2-e3', 'e7-e5', 'g1-f3', 'b8-c6'//, 'Bc4', 'Bc5', 'b4', 'Bxb4', 'c3', 'Ba5'
    ];

    const { activeEventKey } = useContext(AccordionContext);
    // be careful of `includes`, as it will match substring also, as it's not always array, mostly string, although from type it can be array also
    const isActive: boolean =
        // activeEventKey can be array also so keep this in mind but for now is fine hack
        (activeEventKey === eventKey) || false;

    return (<>
        <Accordion.Item eventKey={eventKey}
            style={{
                display: "grid",
                width: "100%",
                gridTemplateColumns: "80% 20%",
                overflow: "clip"
            }}>
            <div>
                <TestCaseHeader idx={idx} doc={doc} />
                <Accordion.Body>
                    {/* Make lengths equal for moves and grader moves - seems length is off for both, make it constant */}
                    <MovesLog doc={doc} />
                </Accordion.Body>
            </div>
            <div style={{
                backgroundColor: "green",
                // looks good without much strain on the eyes
                maxHeight: "20rem"
            }}>
                {
                    isActive
                        ?
                        <MovesBoardWrapper
                            input={doc.input}
                            output={doc.output}
                            boardString={doc.board} />
                        :
                        <></>
                }
            </div>
        </Accordion.Item>
    </>);
}

export default SingleAccordion;

// show spinner if loading is there, it wont take much time though as it is not network call
// create moves board here itself from i/p and o/p. Think of all the possible scenarios so I can handle in backend
// exported to be used other places as well
export const MovesBoardWrapper = ({
    input,
    output,
    boardString
}: {
    input: Array<string>,
    output: Array<string>,
    boardString: string
}) => {
    if (eq(boardString, undefined)
        || eq(boardString, "")
        || eq(boardString, " ")
        || !isValidBoardString(boardString)) {
        return (<></>);
    }

    const board = boardString.split(" ").filter(piece => {
        const isEmpty: boolean = eq(piece, undefined) || eq(piece, "") || eq(piece, " ");
        return !isEmpty;
    });

    // can change `fen` here for testing invalid board positions
    const startFen: string = getFen(convertBackendBoardToFrontend(board));

    if (!startFen || eq(startFen, "")) {
        return (<></>);
    }

    const moves = ['start'];
    for (let
        i = 0;
        output[i] || input[i];
        i++) {
        if (output[i]) moves.push(output[i]);
        if (input[i]) moves.push(input[i]);
    }

    return (
        <MovesBoardDisplay
            movesList={moves}
            startFen={startFen} />
    );
}
import { useContext } from "react";
import { Accordion, AccordionContext } from "react-bootstrap";
import { Board, Piece } from "../../../chess/types";
import { getFen } from "../../../chess/utilities";
import { eq } from "../../../utilities/equals";
import MovesBoardDisplay from "../../chessboard/movesboard/movesBoardDisplay";
import MovesLog from "./movesLog";
import TestCaseHeader from "./testCaseHeader";

// !!! TODO: Bug in this it seems, in large no. of test cases, the accordions other than the one selected also opens(specially for last test case selection)
// checks every single accordion on any update, I guess this may be the problem with react, in jquery we have more control on this to go directly there -- is this true though, doesn't seaching for selector also takes time? prob it will be indexed
const SingleAccordion = ({
    idx, doc, eventKey
}: any) => {
    const STARTING_POSITION = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
    const moveList = [
        'start', 'e2-e3', 'e7-e5', 'g1-f3', 'b8-c6'//, 'Bc4', 'Bc5', 'b4', 'Bxb4', 'c3', 'Ba5'
    ];

    const { activeEventKey } = useContext(AccordionContext);
    const isActive: boolean = activeEventKey?.includes(eventKey) || false;

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
// TODO: Remove pointer from movesBoard
const MovesBoardWrapper = ({
    input,
    output,
    boardString
}: {
    input: Array<string>,
    output: Array<string>,
    boardString: string
}) => {
    if (eq(boardString, undefined) || eq(boardString, "") || eq(boardString, " ")) {
        return (<></>);
    }

    const board = boardString.split(" ").filter(piece => {
        const isEmpty: boolean = eq(piece, undefined) || eq(piece, "") || eq(piece, " ");
        return !isEmpty;
    });

    const convertBoard = (): Board => {
        let res: Board = [...Array(8)].map(e => Array(8));
        let counter = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let curr: Piece | undefined;
                const piece: string | undefined = board.at(counter);

                //console.log("piece", piece);

                if (eq(piece, "X")) {
                    curr = undefined;
                } else if (eq(piece, "Q")) {
                    curr = { type: "q", color: "w" };
                } else if (eq(piece, "K")) {
                    curr = { type: "k", color: "w" };
                } else if (eq(piece, "P")) {
                    curr = { type: "p", color: "w" };
                } else if (eq(piece, "B")) {
                    curr = { type: "b", color: "w" };
                } else if (eq(piece, "N")) {
                    curr = { type: "n", color: "w" };
                } else if (eq(piece, "R")) {
                    curr = { type: "r", color: "w" };
                } else if (eq(piece, "BQ")) {
                    curr = { type: "q", color: "b" };
                } else if (eq(piece, "BK")) {
                    curr = { type: "k", color: "b" };
                } else if (eq(piece, "BP")) {
                    curr = { type: "p", color: "b" };
                } else if (eq(piece, "BB")) {
                    curr = { type: "b", color: "b" };
                } else if (eq(piece, "BN")) {
                    curr = { type: "n", color: "b" };
                } else if (eq(piece, "BR")) {
                    curr = { type: "r", color: "b" };
                }

                res[i][j] = curr;

                counter += 1;
            }
        }

        return res;
    }

    // TODO: Fix startFen and this logic too chekc it, added for tutorial problems, so moves board won't be displayed
    const startFen: string = getFen(convertBoard());
    //console.log("startFen", startFen);

    if (!startFen || eq(startFen, "")) {
        return (<></>);
    }

    // TODO: see if status is displayed correctly
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
import { useContext } from "react";
import { Accordion, AccordionContext } from "react-bootstrap";
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
                            startFen={''} />
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
    startFen
}: {
    input: Array<string>,
    output: Array<string>,
    startFen: string
}) => {
    // write a program and check it
    const moves = ['start'];
    for (let
        i = 0;
        input && input[i] && output && output[i];
        i++) {
        moves.push(input[i]);
        moves.push(output[i]);
    }

    return (
        <MovesBoardDisplay
            movesList={moves}
            startFen={startFen} />
    );
}
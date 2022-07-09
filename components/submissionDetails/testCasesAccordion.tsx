import { useContext, useState } from "react";
import { Accordion, AccordionContext, ListGroup } from "react-bootstrap";
import MovesBoardDisplay from "../../components/chessboard/movesboard/movesBoardDisplay";
import { TestCaseDocument } from "./testCases";

// see if we can transition to showing chessboard when accordion clicked, otherwise just show full accordion only
// TODO: Use scrolling space if board not shown
// TODO: Should we have just 1 open? Seem fine to me, we can add option for disabling it in future. Also it's very cumbersome right now
const TestCasesAccordion = ({ arr }: { arr: Array<any> }) => {

    // make it a list if more keys are required
    const [boardKey, setBoardKey] = useState<Array<string>>(['']);

    const closeBoard = (idx: string) => {
        const singleBoard = () => setBoardKey([]);
        const multiBoard = () => {
            if (boardKey?.includes(idx)) {
                setBoardKey(boardKey.filter(kk => kk !== idx)); // for closing toggle
            }
        }

        singleBoard();
    };

    const openBoard = (idx: string) => {
        const singleBoard = () => setBoardKey([idx]);
        const multiBoard = () => {
            if (!boardKey?.includes(idx)) { // ideally condition should not happen
                setBoardKey([...boardKey].concat([idx]));
            }
        }

        singleBoard();
    }

    return (<>
        <div>
            <Accordion
                defaultActiveKey={['']} // all empty in beg so chessBoard can work properly
                flush={true} //see what does this do
            >
                {
                    arr.map((doc, idx) => {
                        console.log(doc);
                        const eventKey = idx.toString();
                        return (
                            <SingleAccordion
                                idx={idx}
                                doc={doc}
                                key={idx} // since this doesn't really update so we can keep this key
                                eventKey={eventKey}
                                shouldShowBoard={
                                    // ensures only 1 board will be shown, not sure if there is a performance issue here so test it out
                                    boardKey?.at(-1) === eventKey
                                }
                                closeBoard={closeBoard}
                                openBoard={openBoard} />
                        );
                    })
                }
            </Accordion>
        </div>
    </>);
}

export default TestCasesAccordion;

// checks every single accordion on any update, I guess this may be the problem with react, in jquery we have more control on this to go directly there -- is this true though, doesn't seaching for selector also takes time? prob it will be indexed
const SingleAccordion = ({
    idx,
    doc,
    eventKey,
    shouldShowBoard,
    closeBoard,
    openBoard
}: any) => {
    const STARTING_POSITION = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
    const moveList = [
        'start', 'e2-e3', 'e7-e5', 'g1-f3', 'b8-c6'//, 'Bc4', 'Bc5', 'b4', 'Bxb4', 'c3', 'Ba5'
    ];

    console.log(shouldShowBoard + " " + eventKey);

    const { activeEventKey } = useContext(AccordionContext);
    const isActive: boolean = activeEventKey?.includes(eventKey) || false;

    const openBoardIndex = () => openBoard(eventKey);
    const closeBoardIndex = () => closeBoard(eventKey);

    return (<>
        <Accordion.Item eventKey={eventKey}
            style={{
                display: "grid",
                width: "100%",
                gridTemplateColumns: "70% 30%",
                overflow: "clip"
            }}>
            <div>
                <ContextAwareToggle
                    idx={idx}
                    doc={doc}
                    isActive={isActive}
                    closeBoard={closeBoardIndex}
                    openBoard={openBoardIndex} />
                <Accordion.Body
                    style={{
                        padding: "0px", // overriding default
                    }}>
                    <AccordionCollapse doc={doc} />
                </Accordion.Body>
            </div>
            <div style={{
                backgroundColor: "green"
                //aspectRatio: "1/1"
            }}>
                {
                    shouldShowBoard
                        ?
                        // show spinner if loading is there
                        // create moves board here itself from i/p and o/p. Think of all the possible scenarios so I can handle in backend
                        <MovesBoardDisplay
                            movesList={moveList}
                            startFen={STARTING_POSITION} />
                        :
                        // add chessboard and moves log open & close animation also later
                        // currently can be used for status
                        <div></div> // no need to keep saying it is a chessboard
                }
            </div>
        </Accordion.Item>
    </>);
}

// see how to pass callbacks directly from top parent instead of layering functions
const ContextAwareToggle = ({
    idx,
    doc,
    isActive,
    closeBoard,
    openBoard
}: any) => {

    // try to control speed of opening accordion also
    return (<>
        <Accordion.Header
            onClick={() => {
                if (isActive) {
                    closeBoard();
                } else {
                    openBoard();
                }
            }}
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

const AccordionCollapse = ({ doc }: { doc: TestCaseDocument }) => {
    return (<>
        <div
            style={{
                width: "100%",
                height: "100%",
                padding: "1rem"
            }}>

            {/* TODO: See if you want to add indexes to items or have them stack together, one above and below */}
            {/* TODO: Make sure in backed I don't recieve large strings or large array */}
            <div id="mover">
                <>Grader Moves</>
                {/* Can add option to view full as it is without scroll in future */}
                <div
                    style={{
                        overflow: "scroll",
                        whiteSpace: "nowrap",
                        boxShadow: "0px 0px 5px 2px lightgreen"
                    }}>
                    <ListGroup horizontal>
                        {
                            doc.input.map((val, idx) => (
                                <ListGroup.Item
                                    key={idx}
                                    style={{
                                        height: "3rem"
                                    }}>
                                    {val}
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </div>
            </div>

            <div id="moves">
                <>Moves</>
                {/* Can add option to view full as it is without scroll in future */}
                {/* not able to fix scroll issue, tried onWheel - best bet */}
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
                            doc.output.map((val, idx) => (
                                <ListGroup.Item
                                    key={idx}
                                    style={{
                                        height: "3rem"
                                    }}>
                                    {val}
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </div>
            </div>

            <div id="errorMessage">
                {doc.message}
            </div>

        </div>
    </>);
}

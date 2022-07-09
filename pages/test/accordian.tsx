import { useContext, useState } from "react";
import { Accordion, AccordionContext } from "react-bootstrap";
import MovesBoardDisplay from "../../components/chessboard/movesboard/movesBoardDisplay";

// see if we can transition to showing chessboard when accordion clicked, otherwise just show full accordion only
const Page = () => {
    const arr = [...Array(100).keys()];

    // make it a list if more keys are required
    const [boardKey, setBoardKey] = useState<Array<string>>(['']);

    const closeBoard = (idx: string) => {
        if (boardKey?.includes(idx)) {
            setBoardKey(boardKey.filter(kk => kk !== idx)); // for closing toggle
        }
    };

    const openBoard = (idx: string) => {
        if (!boardKey?.includes(idx)) { // ideally condition should not happen
            setBoardKey([...boardKey].concat([idx]));
        }
    }

    return (<>
        <div>
            <Accordion
                defaultActiveKey={['']} // all empty in beg so chessBoard can work properly
                flush={true} //see what does this do
                alwaysOpen>
                {
                    arr.map(idx => {
                        const eventKey = idx.toString();
                        return (
                            <SingleAccordion
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

export default Page;

// checks every single accordion on any update, I guess this may be the problem with react, in jquery we have more control on this to go directly there -- is this true though, doesn't seaching for selector also takes time? prob it will be indexed
const SingleAccordion = ({
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
                    isActive={isActive}
                    closeBoard={closeBoardIndex}
                    openBoard={openBoardIndex} />
                <Accordion.Body
                    style={{
                        padding: "0px", // overriding default
                    }}>
                    <div style={{}}>3423</div>
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
    isActive,
    closeBoard,
    openBoard
}: any) => {

    return (<>
        <Accordion.Header
            onClick={() => {
                if (isActive) {
                    closeBoard();
                } else {
                    openBoard();
                }
            }}
            style={{
                height: "2rem",
                overflow: "clip",
                display: "flex"
            }}>
            Open
        </Accordion.Header>
    </>);
}

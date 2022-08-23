import { Accordion } from "react-bootstrap";
import SingleAccordion from "./singleAccordion";

const TestCases = ({ arr }: { arr: Array<any> }) => {
    return (<>
        <div>
            <Accordion
                // all empty in beg so chessBoard can work properly
                defaultActiveKey={['']}
                flush={true}>
                {
                    arr.map((doc, idx) => {
                        //console.log(doc);
                        const eventKey = idx.toString();
                        return (
                            <SingleAccordion
                                key={idx}
                                idx={idx}
                                doc={doc}
                                eventKey={eventKey} />
                        );
                    })
                }
            </Accordion>
        </div>
    </>);
}

export default TestCases;

// these functions are not needed now but kept for legacy reasons
// only 1 board open and kept track of latest open board
// const closeBoard = (idx: string) => {
//     const singleBoard = () => setBoardKey([]);
//     const multiBoard = () => {
//         if (boardKey?.includes(idx)) {
//             setBoardKey(boardKey.filter(kk => kk !== idx)); // for closing toggle
//         }
//     }

//     singleBoard();
// };

// const openBoard = (idx: string) => {
//     const singleBoard = () => setBoardKey([idx]);
//     const multiBoard = () => {
//         if (!boardKey?.includes(idx)) { // ideally condition should not happen
//             setBoardKey([...boardKey].concat([idx]));
//         }
//     }

//     singleBoard();
// }

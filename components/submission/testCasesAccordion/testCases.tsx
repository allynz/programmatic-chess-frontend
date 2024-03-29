import { Accordion } from "react-bootstrap";
import SingleAccordion from "./singleAccordion";

const TestCases = ({ arr }: { arr: Array<any> }) => {
    // formatting for test cases, shift to test branch
    // const formatForMarkdown = (doc: any) => {
    //     let res: string = "";

    //     const ip = doc.input as Array<string>;
    //     const op = doc.output as Array<string>;

    //     res += "| Input |\n";
    //     res += "|-------|\n";
    //     res += "| " + doc.board + " |" + "\n";
    //     ip.forEach(move => res += "| " + move + " |\n");

    //     res += "\n";
    //     res += "| Output |\n";
    //     res += "|-------|\n";
    //     op.forEach(move => res += "| " + move + " |\n");

    //     console.log(res);
    // };

    // const formatForAnimation = (doc: any) => {
    //     let res: string = "";

    //     const ip = doc.input as Array<string>;
    //     const op = doc.output as Array<string>;

    //     res += "| Input |\n";
    //     ip.forEach(move => res += "\"" + move + "\",\n");

    //     res += "\n";
    //     res += "| Output |\n";
    //     op.forEach(move => res += "\"" + move + "\",\n");


    //     console.log(res);
    // };

    // let aa: Array<any> = [];
    // arr.map((doc, idx) => {
    //     if (doc.input && doc.input.length >= 1) {
    //         aa.push(doc);
    //     }
    // });

    // aa.sort((a: any, b: any) => (a.input.length <= b.input.length ? -1 : 1));

    // aa = aa.slice(0, 4);
    // aa.forEach((doc) => {
    //     formatForMarkdown(doc);
    //     console.log(JSON.stringify(doc, null, 4));
    //     //formatForAnimation(doc);
    // })

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

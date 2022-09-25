import { Piece } from "../../chess/types";
import PlaygroundBoard from "../../components/chessboard/playground/boardWrapper";

const Test = () => {
    const pieces: Array<Piece> = [
        {
            type: 'k',
            color: 'b'
        },
        {
            type: 'q',
            color: 'w'
        },
        {
            type: 'q',
            color: 'w'
        }
    ];

    return (<>
        <PlaygroundBoard pieces={pieces} />
    </>);
}

export default Test;
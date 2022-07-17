import { Piece } from "../../chess/types";
import PlaygroundBoard from "../../components/chessboard/playground/boardWrapper";

const Test = () => {
    const pieces: Array<Piece> = [
        {
            type: 'k',
            color: 'b'
        },
        {
            type: 'r',
            color: 'w'
        },
        {
            type: 'r',
            color: 'w'
        }
    ];

    return (<>
        <PlaygroundBoard pieces={pieces} />
    </>);
}

export default Test;
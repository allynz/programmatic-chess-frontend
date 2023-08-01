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
        <BoardImage />
    </>);
}

const BoardImage = () => {
    return (<>
        <div style={{
            display: "grid",
            gridTemplateRows: "50% 50%",
            gridTemplateColumns: "50% 50%",
            height: "10rem",
            width: "10rem",
            backgroundColor: "red",
            margin: "1rem",
            boxShadow: "0px 0px 5rem 5rem lightgreen"
        }}>
            <div
                style={{
                    backgroundColor: "black"
                }} />
            <div
                style={{
                    backgroundColor: "white"
                }} />
            <div
                style={{
                    backgroundColor: "white"
                }} />
            <div
                style={{
                    backgroundColor: "black"
                }} />
        </div>
    </>);
}

export default Test;
import MovesBoardDisplay from "../../components/chessboard/movesboard/movesBoardDisplay";

const Test = () => {
    const STARTING_POSITION = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
    const moveList = [
        'start', 'e2-e3', 'e7-e5', 'g1-f3', 'b8-c6'//, 'Bc4', 'Bc5', 'b4', 'Bxb4', 'c3', 'Ba5'
    ];

    return (<>
        <div style={{ margin: "10rem", height: "30rem", width: "30rem" }}>
            <MovesBoardDisplay movesList={moveList} startFen={STARTING_POSITION} />
        </div>
    </>);
}

export default Test;
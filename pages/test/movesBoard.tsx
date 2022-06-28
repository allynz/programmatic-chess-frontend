import MovesBoardDisplay from "../../components/chessboard/movesboard/movesBoardDisplay";

const Test = () => {
    const moveList = [
        'start', 'e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'b4', 'Bxb4', 'c3', 'Ba5'
    ];

    return (<>
        <MovesBoardDisplay movesList={moveList} />
    </>);
}

export default Test;
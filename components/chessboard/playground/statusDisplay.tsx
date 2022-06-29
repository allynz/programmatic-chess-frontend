import { Status } from "../../../chess/config";

// make sure status is present beforehand otherwise undefined is returned
const StatusDisplay = ({ status }: { status: string }) => {
    const statusMap = new Map<string, JSX.Element>([
        [Status.CHECKMATE, <Checkmate />],
        [Status.STALEMATE, <Stalemate />],
        [Status.INSUFFICIENT_MATERIAL, <InsufficientMaterial />],
        [Status.PLAYING, <Playing />]
    ]);

    return statusMap.get(status) || <Unknown />;
}

export default StatusDisplay;

const Checkmate = () => {
    return (<>Checkmate</>);
}

const Stalemate = () => {
    return (<>Stalemate: Opponent cannot make a move but is not in check</>);
};

const InsufficientMaterial = () => {
    return (<>Insufficient Material to finsh the game</>);
};

const Playing = () => {
    return (<>Playing</>);
}

const Unknown = () => {
    return (<>Unknown</>);
}
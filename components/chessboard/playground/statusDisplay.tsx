import { Status } from "../../../chess/config";

// make sure status is present beforehand otherwise undefined is returned
const StatusDisplay = ({ status }: { status: string }) => {
    const statusMap = new Map<string, JSX.Element>([
        [Status.CHECKMATE, <Checkmate />],
        [Status.STALEMATE, <Stalemate />],
        [Status.INSUFFICIENT_MATERIAL, <InsufficientMaterial />],
        [Status.PLAYING, <Playing />]
    ]);

    const element = statusMap.get(status) || <Unknown />;

    return (<>
        <div
            style={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
            {element}
        </div>
    </>);
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
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Status } from "../../../chess/config";

// make sure status is present beforehand otherwise undefined is returned
// TODO: Add colors to it to show correct/failure status
const StatusDisplay = ({ status }: { status: string }) => {
    const statusMap = new Map<string, any>([
        [
            Status.CHECKMATE,
            [<Checkmate />,
                'SUCCESS.\nGame over.\nOpponent king is in check and has no valid moves']
        ],
        [
            Status.STALEMATE,
            [<Stalemate />,
                'UNSUCCESSFUL.\nGame over.\nOpponent king has no valid moves but is not in check']
        ],
        [
            Status.INSUFFICIENT_MATERIAL,
            [<InsufficientMaterial />,
                'UNSUCCESSFUL.\nGame over.\nOpponent king cannot be checkmated with the current material']
        ],
        [
            Status.PLAYING,
            [<Playing />,
                'Opponent has valid moves, try to checkmate the opponent']
        ]
    ]);

    const element = statusMap.get(status);
    const elementJSX = element[0] || <Unknown />;

    return (<>
        <div
            style={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
            <OverlayTrigger
                placement="right"
                delay={{ show: 0, hide: 100 }}
                overlay={
                    <Tooltip id="button-tooltip">
                        {element[1] || ""}
                    </Tooltip>
                }>
                <div>
                    {elementJSX}
                </div>
            </OverlayTrigger>
        </div>

    </>);
}

export default StatusDisplay;

// Have hover capability on Status
const Checkmate = () => {
    return (<>Checkmate</>);
}

const Stalemate = () => {
    return (<>Stalemate</>);
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


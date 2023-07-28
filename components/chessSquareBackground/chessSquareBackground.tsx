import { random } from "lodash";
import Image from "next/image";

const ChessSquareBackground = () => {
    const fillColors1 = [
        '#C4A484',
        'white',
        'grey',
        '#FFC300',
        '#00BBFF',
        '#00FFC3',
        '#F39C12',
        '#F39C12',
        '#CB4335'
    ];

    const fillColors = [
        '#C4A484',
        'grey'
    ];

    const chessPiecesBlack = [
        'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg',
        'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg',
        'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg',
        'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg',
        'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg',
        'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg'
    ];

    const chessPiecesWhite = [
        'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg',
        'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg',
        'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg',
        'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg',
        'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg',
        'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg'
    ];

    return (<>
        <div
            style={{
                borderColor: "black",
                border: "5px solid",
                borderRadius: "1rem",
                backgroundColor: fillColors[random(fillColors.length - 1)],

                height: "5rem",
                width: "5rem"
            }}>
            <Image
                alt="different chess pieces"
                src={chessPiecesWhite[random(chessPiecesWhite.length - 1)]}
                height={"5rem"}
                width={"5rem"}
                objectFit="contain"
                layout="responsive"
            />
        </div>
    </>);
};

export default ChessSquareBackground;
import { range } from "lodash";
import { BrightnessAltHighFill, Icon } from "react-bootstrap-icons";

const Diamonds = ({ transform }: any) => {
    const iconList: Array<Icon> = [
        BrightnessAltHighFill
    ];

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-evenly",
                padding: "1rem"
            }}>
            {
                range(6).map(idx => {
                    return (
                        <div key={idx}>
                            <BrightnessAltHighFill
                                style={{
                                    transform: transform
                                }}
                                key={idx}
                                color="royalblue"
                                size={100} />
                        </div>
                    );
                })
            }
        </div>
    );
};

export default Diamonds;
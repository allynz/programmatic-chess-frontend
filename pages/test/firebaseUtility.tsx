import { updateDoc } from "firebase/firestore";
import { Button } from "react-bootstrap";
import { getProblemDocument } from "../../firebase/config";

const Page = () => {
    return (<>
        <div
            style={{
                margin: "10rem"
            }}>
            <Button
                onClick={updateAllDocuments}>
                DO IT
            </Button>
        </div>
    </>);
};

const updateAllDocuments = () => {
    const docsIndices: Array<number> = [
        3,
        4,
        5,
        6,
        7,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,

        1000,
        1001,
        1002
    ];

    docsIndices.forEach(async idx => {
        const IMAGE_SOURCE_PREFIX = "https://programmatic-chess-images.s3.amazonaws.com/displayImages/";
        const doc = getProblemDocument(idx?.toString());
        console.log("updating" + idx);
        await updateDoc(doc, {
            imageSource: IMAGE_SOURCE_PREFIX + idx + ".png"
        });
        console.log("updated" + idx);
    });
};


export default Page;
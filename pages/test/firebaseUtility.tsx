import { deleteField, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Button } from "react-bootstrap";
import { accessProblemPathSegmentsDocument, getProblemDocument } from "../../firebase/config";

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
const docsIndicesTest = [8];

// set to test document first for preventing accidentaly running script
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
            <Button
                onClick={shiftTestCasesToPrivate}>
                Shift test cases to private
            </Button>
        </div>
    </>);
};

const updateAllDocuments = () => {
    docsIndicesTest.forEach(async idx => {
        const IMAGE_SOURCE_PREFIX = "https://programmatic-chess-images.s3.amazonaws.com/displayImages/";
        const doc = getProblemDocument(idx?.toString());
        console.log("updating" + idx);
        await updateDoc(doc, {
            imageSource: IMAGE_SOURCE_PREFIX + idx + ".png"
        });
        console.log("updated" + idx);
    });
};

// test on a dummy problem, then for all
const shiftTestCasesToPrivate = () => {
    docsIndicesTest.forEach(async idx => {
        const index = String(idx);

        const response = await getDoc(getProblemDocument(index));
        const testCaseData: Array<string> = response.get('testCases');
        if (!testCaseData) return;

        const setOperation = await setDoc(
            getProblemTestCasesSettingDocument(index),
            {
                testCases: testCaseData
            }
        );

        const deleteOperation = await updateDoc(
            getProblemDocument(index),
            {
                testCases: deleteField()
            }
        )

        console.log("done writing: " + index);
    });
};

const getProblemTestCasesSettingDocument =
    (id: string) => accessProblemPathSegmentsDocument([id, 'private', 'fields']);

export default Page;
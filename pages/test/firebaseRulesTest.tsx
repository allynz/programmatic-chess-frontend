import { getDocs } from "firebase/firestore";
import { accessProblemPathSegmentsCollection } from "../../firebase/config";

const Page = () => {
    firebaseAccess();

    return (<></>);
};

export default Page;

const firebaseAccess = async () => {
    const ff = await getDocs(getProblemTestCasesDocument('8'));
    console.log("ff", ff.docs.forEach(doc => {
        console.log(doc.data());
    }));
}

const getProblemTestCasesDocument = (id: string) => accessProblemPathSegmentsCollection([id, 'ok']);
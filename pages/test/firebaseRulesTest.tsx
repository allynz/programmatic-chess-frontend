import { getDoc, getDocs } from "firebase/firestore";
import { accessProblemPathSegmentsCollection, accessProblemPathSegmentsDocument, getProblemDocument } from "../../firebase/config";

const Page = () => {
    firebaseAccess();

    return (<></>);
};

export default Page;

const firebaseAccess = async () => {
    const pp = await getDoc(getProblemDocument('8'));
    console.log(pp.data());

    const dd = await getDoc(getProblemTestCasesDocument('8'));
    console.log(dd.data());

    const ff = await getDocs(getProblemTestCasesCollection('8'));
    console.log("docs", ff.docs.forEach(doc => {
        console.log(doc.data());
    }));
}

const getProblemTestCasesCollection = (id: string) => accessProblemPathSegmentsCollection([id, 'private']);
const getProblemTestCasesDocument = (id: string) => accessProblemPathSegmentsDocument([id, 'private', 'fields']);
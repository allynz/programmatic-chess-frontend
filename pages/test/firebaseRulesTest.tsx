import { User } from "firebase/auth";
import { getDoc, getDocs } from "firebase/firestore";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { accessPathSegments, accessProblemPathSegmentsCollection, accessProblemPathSegmentsDocument, getProblemDocument } from "../../firebase/config";

const Page = () => {
    const user = useContext(UserContext);

    //testProblems();
    testSolvedProblems(user);

    return (<></>);
};

export default Page;

const testProblems = async () => {
    const getProblemTestCasesCollection = (id: string) => accessProblemPathSegmentsCollection([id, 'private']);
    const getProblemTestCasesDocument = (id: string) => accessProblemPathSegmentsDocument([id, 'private', 'fields']);

    const pp = await getDoc(getProblemDocument('8'));
    console.log(pp.data());

    const dd = await getDoc(getProblemTestCasesDocument('8'));
    console.log(dd.data());

    const ff = await getDocs(getProblemTestCasesCollection('8'));
    console.log("docs", ff.docs.forEach(doc => {
        console.log(doc.data());
    }));
};

// use unisgned, or an account different from admin account
const testSolvedProblems = async (user: User | null) => {
    const sampleUserId = "dSGe3T90SUPYp8WVX1WdsfuJFKt2"; // admin account
    const ownuserId = user?.uid || "dummy"; // need to have a non empty string for firebase to work

    const accessSolvedProblems = (id: string) => accessPathSegments('SolvedProblems', [id]);

    // put own user first, as if error is thrown, then later code is not executed
    const docOwnUser = await getDoc(accessSolvedProblems(ownuserId));
    console.log("own user", docOwnUser.data());

    const docAnotherUser = await getDoc(accessSolvedProblems(sampleUserId));
    console.log("another user", docAnotherUser.data());
};
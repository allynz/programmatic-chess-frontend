import { query, where } from "@firebase/firestore";
import { useContext } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import UserContext from "../../contexts/UserContext";
import { getCollection } from "../../firebase/config";
import { SubmissionTable } from "../information/submissionTable";
import FirebaseHookDisplay from "./firebaseHookDisplay";

const SubmissionList = (problemId: string) => {
    const userId = useContext(UserContext)?.uid || "dummy";
    const [value, loading, error] =
        // See why where and orderBy cannot be combined easily, do I need to create indexes?
        useCollectionData(
            query(
                getCollection('Submissions'),
                where("userId", "==", userId),
                where("problemId", "==", String(problemId))
            ));

    const content = (list: Array<any>) => (
        <SubmissionTable
            submissionList={
                // also check for if time present or not
                list.sort((a, b) => {
                    const
                        t1 = a.timestamp?.submitted,
                        t2 = b.timestamp?.submitted;
                    if (t1 > t2) {
                        return -1;
                    } else if (t2 == t2) {
                        return 0;
                    } else {
                        return 1;
                    }
                })
            } />
    );

    return <FirebaseHookDisplay
        value={value}
        loading={loading}
        error={error}
        content={content} />
}

export default SubmissionList;
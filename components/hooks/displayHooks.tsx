import { query, where } from "@firebase/firestore";
import { useContext } from "react";
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { SubmissionTable } from "../information/submissionTable";
import UserContext from "../../contexts/UserContext";
import { getCollection, getDocument } from "../../firebase/config";
import Loading from "../general/loading";

export function getSubmissionCollectionDataHook(problemId: string) {
    const userId = useContext(UserContext)?.uid || "dummy";
    const [value, loading, error] =
        // See why where and orderBy cannot be combined easily, do I need to create indexes?
        useCollectionData(
            query(
                getCollection('Submissions'),
                where("userId", "==", userId),
                where("problemId", "==", String(problemId))
            ));

    if (error) {
        return (<strong>Error, please try again</strong>);
    } else if (loading) {
        return (<Loading />);
    } else if (value) {
        // will it already be computed if I keep it as a var outside?
        return (
            <SubmissionTable submissionList={
                value.sort((a, b) => {
                    const
                        t1 = a.timestamp.submitted,
                        t2 = b.timestamp.submitted;
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
    } else {
        return (<strong>Unknown Error, please try again</strong>);
    }
}

export function getProblemCollectionDataHook() {
    const [value, loading, error] =
        useCollectionData(getCollection('Problems'));

    return (
        <div>
            <p>
                {error && <strong>Error: {JSON.stringify(error)}</strong>}
                {loading && <span>Collection: Loading...</span>}
                {value && (
                    <div>
                        Collection:
                        {value
                            .map(doc => (
                                <div key={doc.id} style={{ margin: "1rem" }}>
                                    {JSON.stringify(doc)}
                                </div>
                            ))}
                    </div>
                )}
            </p>
        </div>
    );
}

export function getSubmissionDataHook(submissionId: string) {
    const [value, loading, error] = useDocumentData(getDocument(submissionId));

    return (<>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Loading...</span>}
        {value &&
            <div>
                {value.status /** if status is not present so not showing anything */}
            </div>}
    </>);
}

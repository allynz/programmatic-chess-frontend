import React from "react";
import { getCollection, getDocument } from "./config";
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { orderBy, query, where } from "@firebase/firestore";
import { SubmissionTable } from "../components/information/submissionTable";

// hopefully the hook doesnt run on every submission addition, to filter again otherwise it would be a lot of TLE, and I would have to structure data differently
// TODO: Find out how many reads do hooks take up
// Better to keep data for specific users as then my hooks will be pointing to specific collection rather than all
export function getSubmissionCollectionDataHook() {
    const [value, loading, error] =
        // See why where and orderBy cannot be combined easily, do I need to create indexes?
        useCollectionData(
            query(
                getCollection('Submissions'),
                where("userId", "==", "1"),
                where("problemId", "==", "2")
            ));

    // TODO: Ordering is random so make it ordered by time
    return (<>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {value && (
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
            } />)}
    </>);
}

export function getProblemCollectionDataHook() {
    const [value, loading, error] =
        // See why where and orderBy cannot be combined easily, do I need to create indexes?
        useCollectionData(getCollection('Problems'));

    // TODO: Ordering is random so make it ordered by time
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

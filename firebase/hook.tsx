import React from "react";
import { getFirestoreCollection } from "./config";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { orderBy, query, where } from "@firebase/firestore";

export function getFirestoreSubmissionCollectionData() {
    const [value, loading, error] =
        // See why where and orderBy cannot be combined easily, do I need to create indexes?
        useCollectionData(
            query(
                getFirestoreCollection('Submissions'),
                where("userId", "==", "1"),
                where("problemId", "==", "2")
            ));

    // TODO: Ordering is random so make it ordered by time
    return (
        <>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Collection: Loading...</span>}
            {value && (
                <>
                    Collection:
                    {value
                        // Descending sort by timestamp
                        .sort((a, b) => {
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
                        .map(doc => (
                            <div key={doc.id} style={{ margin: "1rem" }}>
                                {JSON.stringify(doc)}
                            </div>
                        ))}
                </>
            )}
        </>
    );
}

export function getFirestoreProblemCollectionData() {
    const [value, loading, error] =
        // See why where and orderBy cannot be combined easily, do I need to create indexes?
        useCollectionData(getFirestoreCollection('Problems'));

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

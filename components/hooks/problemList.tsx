import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getCollection } from "../../firebase/config";
import FirebaseHookDisplay from './firebaseHookDisplay';

// do styling even for error states later
const ProblemList = () => {
    const [value, loading, error] =
        useCollectionData(getCollection('Problems'));

    const content = (list: Array<any>) => {
        return (
            <div>
                Collection:
                {list
                    .map(doc => (
                        <div key={doc.id} style={{ margin: "1rem" }}>
                            {JSON.stringify(doc)}
                        </div>
                    ))}
            </div>
        );
    };

    return <FirebaseHookDisplay
        value={value}
        loading={loading}
        error={error}
        content={content} />
}

export default ProblemList;
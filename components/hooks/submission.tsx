import Link from 'next/link';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { getDocument } from "../../firebase/config";
import { eq } from '../../utilities/equals';
import FirebaseHookDisplay from './firebaseHookDisplay';

const Submission = (submissionId: string) => {
    const [value, loading, error] = useDocumentData(getDocument(submissionId));

    const content = ({ status }: { status: string }) => {
        //console.log(status);

        if (eq(status, "SUCCESS")) {
            return (
                <Link
                    href={"/submission/" + submissionId}>
                    <a style={{ color: "green" }}>
                        {status}
                    </a>
                </Link>
            );
        } else if (status === "WAITING") {
            return (
                <Link
                    href={"/submission/" + submissionId}>
                    <a style={{ color: "black" }}>
                        {status}
                    </a>
                </Link>
            );
        } else {
            return (
                <Link
                    href={"/submission/" + submissionId}>
                    <a style={{ color: "red" }}>
                        {status}
                    </a>
                </Link>
            );
        }
    }

    return <FirebaseHookDisplay
        value={value}
        loading={loading}
        error={error}
        content={content} />
};

export default Submission;
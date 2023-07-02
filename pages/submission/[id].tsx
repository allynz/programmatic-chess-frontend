import { DocumentData } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import PageWrapNav from "../../components/navbar/pageWrapper";
import SubmissionDisplay from "../../components/submission/submissionDisplay";
import BACKEND from "../../configs/hostConfig";
import { getDocument } from "../../firebase/config";
import { eq } from "../../utilities/equals";

type Props = {
    id: string;
    code: string;
};

const Submission = ({ id, code }: Props) => {
    return (<>
        <PageWrapNav>
            <SubmissionDisplayComponent
                id={id}
                code={code} />
        </PageWrapNav>
    </>);
}

const SubmissionDisplayComponent = ({ id, code }: any) => {
    // this way i can get auth data
    const [doc, loading, error] = useDocumentData(getDocument(id));

    if (doc) {
        // console.log("doc", doc);

        // have absolute sizing on this page, as users may shift to larger screen to see more stuff, rather than responsive behaviour
        return (<>
            <SubmissionDisplay
                doc={doc}
                code={code} />
        </>);
    } else if (loading) {
        // console.log("loading");
        const data: DocumentData = { status: "LOADING.." };
        return (<>
            <SubmissionDisplay
                doc={data}
                code={code} />
        </>);
    } else if (error) {
        const data: DocumentData = { status: "ERROR" };
        return (<>
            <SubmissionDisplay
                doc={data}
                code={code} />
        </>);
    } else {
        const data: DocumentData = { status: "UNKNOWN ERROR" };
        return (<>
            <SubmissionDisplay
                doc={data}
                code={code} />
        </>);
    }
}

export default Submission;

// need to return only JSON from here as it is running in server
export async function getServerSideProps({ req, res, params }: any) {
    // Enable caching in production, not now
    // Is caching useful in waiting case? prob not as values are changing rapidly, Someone can DDOS this page, so watch out
    // but since only code is fetched, we can cache it for eternity if success result, sometimes error can be sent tho
    // res.setHeader(
    //     'Cache-Control',
    //     'public, s-maxage=10, stale-while-revalidate=59'
    // );

    //console.log(params);

    const id: number = params.id;
    const submission = await fetchSubmission(params.id);

    // Catch exceptions also
    // const doc = await
    //     getDoc(getDocument(params.id))
    //         .then(doc => JSON.stringify(doc.data()) || [])
    //         .catch(ex => { console.log("exception", ex); return {} });

    // https://nextjs.org/docs/pages/api-reference/functions/get-server-side-props#notfound
    if (eq(submission.status, "Error")) {
        return {
            notFound: true
        };
    }

    return {
        props: { id, code: submission.displayCode }
    };
}

// LATER: Have to handle all cases, for now generic message
// TODO: Handle http status codes
const fetchSubmission = async (id: string) => {
    const submission = await
        fetch(BACKEND + `/submissionCode?id=${id}`)
            .then(async res => {
                if (res.ok) {
                    const code = await res.json().then(result => result.code);
                    return {
                        status: "Success",
                        displayCode: code
                    };
                } else {
                    throw new Error('Request failed with status code: ' + res.status);
                }
            })
            .catch(err => {
                // console.log(err); // remove it from user
                return {
                    status: "Error",
                    displayCode: ""
                };
            });

    return submission;
};
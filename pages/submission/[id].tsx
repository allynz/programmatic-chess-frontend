import { DocumentData, getDoc } from "firebase/firestore";
import PageWrapNav from "../../components/navbar/pageWrapper";
import SubmissionDisplay from "../../components/submission/submissionDisplay";
import { getDocument } from "../../firebase/config";

type Props = {
    code: string;
    doc: string;
};

const Submission = ({ code, doc }: Props) => {
    const docData: DocumentData = JSON.parse(doc);

    // have absolute sizing on this page, as users may shift to larger screen to see more stuff, rather than responsive behaviour
    return (<>
        <PageWrapNav>
            <SubmissionDisplay
                doc={docData}
                code={code} />
        </PageWrapNav>
    </>);
}

export default Submission;

// need to return only JSON from here as it is running in server
export async function getServerSideProps({ req, res, params }: any) {
    // Enable caching in production, not now
    // Is caching useful in waiting case? prob not as values are changing rapidly, Someone can DDOS this page, so watch out
    // res.setHeader(
    //     'Cache-Control',
    //     'public, s-maxage=10, stale-while-revalidate=59'
    // );

    //console.log(params);

    const code = await fetchCode(params.id);

    // Catch exceptions also
    const doc = await
        getDoc(getDocument(params.id))
            .then(doc => JSON.stringify(doc.data()) || []);

    return {
        props: { code, doc }
    };
}

// TODO: Have to handle all cases
const fetchCode = async (id: string) => {
    const res = await
        fetch(`http://localhost:8080/submissionCode?id=${id}`)
            .then(res => res.json())
            .catch(err => {
                console.log(err); // remove it from user
                return { code: "" };
            });

    return res.code;
};
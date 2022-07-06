import { DocumentData, getDoc } from "firebase/firestore";
import PageWrapNav from "../../components/general/pageWrapper";
import SubmissionCode from "../../components/submissionDetails/code";
import SubmissionStats from "../../components/submissionDetails/statistics";
import TestCaseDetailElement from "../../components/submissionDetails/testCases";
import { getDocument } from "../../firebase/config";

type Props = {
    code: string;
    doc: string;
};

// Add titles above each of the blocks to show what info they represent
// Do not add hooks, so just show the info on it directly
// improve naming of variables
// add feature to raise a ticket on a submission - for now just email
export default function Submission({ code, doc }: Props) {
    const docData: DocumentData = JSON.parse(doc);

    // have absolute sizing on this page, a users may shift to larger screen to see more stuff, rather than responsive behaviour
    return (<>
        <PageWrapNav>
            <div
                style={{
                    width: "100%",
                    backgroundColor: "yellow"
                }}>

                {/* Div for editor + status */}
                <div
                    style={{
                        backgroundColor: "white",
                        width: "100%",
                        display: "grid",
                        gridTemplateColumns: "70% 30%",
                        overflow: "clip" // test it and make it work with scroll
                    }}>
                    <SubmissionCode code={code} />
                    <SubmissionStats doc={docData} />
                </div>

                {/* Gap */}
                <br></br>

                <TestCaseDetailElement doc={docData} />
            </div>
        </PageWrapNav>
    </>);
}

// see this use over getStaticProps - no, as that needs all paths known and all submissions will be prefetched, does not sound good idea as there are many submissions
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
        props:
        {
            code,
            doc
        }
    };
}

// TODO: Have to handle all cases
const fetchCode = async (id: string) => {
    const res = await
        fetch(`http://localhost:8080/submissionCode?id=${id}`)
            .then(res => res.json())
            .catch(err => {
                console.log(err)
            });

    return res.code;
};
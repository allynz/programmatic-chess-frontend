import AuthenticationWrapper from "../../components/auth/authentication";
import PageWrapNav from "../../components/navbar/pageWrapper";
import SubmissionDisplay from "../../components/submission/submissionDisplay";

// have absolute sizing on this page, as users may shift to larger screen to see more stuff, rather than responsive behaviour
const Submission = ({ id }: { id: number }) => {
    return (<>
        <PageWrapNav>
            <AuthenticationWrapper>
                <SubmissionDisplay
                    id={String(id)} />
            </AuthenticationWrapper>
        </PageWrapNav>
    </>);
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
    // https://nextjs.org/docs/pages/api-reference/functions/get-server-side-props#notfound

    return {
        props: { id }
    };
}

// LATER: Have to handle all cases, for now generic message
// TODO: Handle http status codes
// const fetchSubmission = async (id: string) => {
//     const submission = await
//         fetch(BACKEND + `/submissionCode?id=${id}`)
//             .then(async res => {
//                 if (res.ok) {
//                     const code = await res.json().then(result => result.code);
//                     return {
//                         status: "Success",
//                         displayCode: code
//                     };
//                 } else {
//                     throw new Error('Request failed with status code: ' + res.status);
//                 }
//             })
//             .catch(err => {
//                 // console.log(err); // remove it from user
//                 return {
//                     status: "Error",
//                     displayCode: ""
//                 };
//             });

//     return submission;
// };
import Script from "next/script";
import AuthenticationWrapper from "../../components/auth/authentication";
import PageWrapNav from "../../components/navbar/pageWrapper";
import SubmissionDisplay from "../../components/submission/submissionDisplay";
import BACKEND from "../../configs/hostConfig";

// have absolute sizing on this page, as users may shift to larger screen to see more stuff, rather than responsive behaviour
const Submission = ({ id, isAuthNeeded }: { id: number, isAuthNeeded: boolean }) => {
    if (isAuthNeeded) {
        return (<>
            {/* <!-- Event snippet for Website traffic conversion page -->  */}
            <Script id='google-ads-conversion-submission'>
                {
                    `
                gtag('event', 'conversion', {'send_to': 'AW-10878653161/KzyeCIKspOMYEOmlrMMo'});
                `
                }
            </Script>
            <PageWrapNav>
                <AuthenticationWrapper>
                    <SubmissionDisplay
                        id={String(id)}
                        isAuthNeeded={isAuthNeeded} />
                </AuthenticationWrapper>
            </PageWrapNav>
        </>);
    } else {
        return (<>
            {/* <!-- Event snippet for Website traffic conversion page -->  */}
            <Script id='google-ads-conversion-submission'>
                {
                    `
                gtag('event', 'conversion', {'send_to': 'AW-10878653161/KzyeCIKspOMYEOmlrMMo'});
                `
                }
            </Script>
            <PageWrapNav>
                <SubmissionDisplay
                    id={String(id)}
                    isAuthNeeded={isAuthNeeded} />
            </PageWrapNav>
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

    const id: number = params.id;

    //console.log(params);
    const codeUrl = new URL(BACKEND + "/isAuthNeededForSubmission");
    codeUrl.searchParams.set("id", id.toString());
    const isAuthNeededResponse: Response = await fetch(codeUrl.toString());

    let isAuthNeeded: boolean = true;
    if (isAuthNeededResponse.ok) {
        const response = await isAuthNeededResponse.json();
        // needed this as type can change if sent value from server is not boolean
        isAuthNeeded = (response === false) ? false : true;
    }

    // console.table([
    //     ["id", id],
    //     ["authneeded: ", isAuthNeeded],
    //     ["isFAlse: ", isAuthNeeded === false]
    // ]);

    // https://nextjs.org/docs/pages/api-reference/functions/get-server-side-props#notfound

    return {
        props: {
            id: id,
            isAuthNeeded: isAuthNeeded
        }
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
import { query, where } from "@firebase/firestore";
import { endBefore, limit, limitToLast, orderBy, startAfter } from "firebase/firestore";
import { getCollection } from "../../firebase/config";
import SubmissionTableHandler from "../information/submissionTable/submissionTableHandler";

const SubmissionList = (problemId: number) => {
    // console.log("rendered sublist");
    return (
        <SubmissionTableHandler
            queries={Queries({ problemId: problemId })} />
    );
}

export default SubmissionList;

const Queries = ({ problemId }: any) => {
    return {
        FIRST_PAGE_HOOK:
            ({ userId, limitValue }: any) =>
                query(
                    getCollection('Submissions'),
                    where("userId", "==", userId),
                    where("problemId", "==", String(problemId)),
                    orderBy("timestamp.submitted", "desc"),
                    limit(limitValue)),
        FETCH_NEXT_QUERY:
            ({ userId, limitValue }: any) => ({ lastDocument }: any) => {
                return query(
                    getCollection('Submissions'),
                    where("userId", "==", userId),
                    where("problemId", "==", String(problemId)),
                    orderBy("timestamp.submitted", "desc"), // TODO: Check if this is working as it was a nested field
                    startAfter(lastDocument),
                    limit(limitValue))
            },
        FETCH_PREV_QUERY:
            ({ userId, limitValue }: any) => ({ firstDocument }: any) =>
                query(
                    getCollection('Submissions'),
                    where("userId", "==", userId),
                    where("problemId", "==", String(problemId)),
                    orderBy("timestamp.submitted", "desc"), // TODO: Check if this is working as it was a nested field
                    endBefore(firstDocument),
                    limitToLast(limitValue))
    }
};
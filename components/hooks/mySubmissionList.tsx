import { query, where } from "@firebase/firestore";
import { endBefore, limit, limitToLast, orderBy, startAfter } from "firebase/firestore";
import { getCollection } from "../../firebase/config";
import SubmissionTableHandler from "../information/submissionTable/submissionTableHandler";

const MySubmissionList = () => {
    return (
        <SubmissionTableHandler
            queries={Queries} />
    );
}

export default MySubmissionList;

const Queries = {
    FIRST_PAGE_HOOK:
        ({ userId, limitValue }: any) =>
            query(
                getCollection('Submissions'),
                where("userId", "==", userId),
                orderBy("timestamp.submitted", "desc"),
                limit(limitValue)),
    FETCH_NEXT_QUERY:
        ({ userId, limitValue }: any) => ({ lastDocument }: any) =>
            query(
                getCollection('Submissions'),
                where("userId", "==", userId),
                // this kind of nesting works: https://stackoverflow.com/questions/46840622/firestore-orderby-on-subproperty-subcollection
                orderBy("timestamp.submitted", "desc"),
                startAfter(lastDocument),
                limit(limitValue)),
    FETCH_PREV_QUERY:
        ({ userId, limitValue }: any) => ({ firstDocument }: any) =>
            query(
                getCollection('Submissions'),
                where("userId", "==", userId),
                orderBy("timestamp.submitted", "desc"),
                endBefore(firstDocument),
                limitToLast(limitValue))
};
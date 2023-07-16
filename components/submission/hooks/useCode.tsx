import BACKEND from "../../../configs/hostConfig";
import { useAuthenticatedRequest } from "../../../hooks/useAuthenticatedRequest";

export const useCode = (id: string): [
    data: string,
    loading: boolean,
    error: any
] => {
    const codeUrl = new URL(BACKEND + "/submissionCode");
    codeUrl.searchParams.set("id", id);
    const { loading, error, data } = useAuthenticatedRequest({
        url: codeUrl
    });

    // console.log(data.code);

    // console.table([
    //     ["data", data],
    //     ["error", error],
    //     ["loading", loading]
    // ]);

    return [data?.code, loading, error];
};
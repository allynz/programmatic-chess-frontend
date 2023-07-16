import BACKEND from "../../configs/hostConfig";
import { useAuthenticatedRequest } from "../../hooks/useAuthenticatedRequest";

export const useSolution = (id: number): string => {
    const solutionUrl = new URL(BACKEND + "/solution");
    solutionUrl.searchParams.set("problemId", String(id));
    const { loading, error, data } = useAuthenticatedRequest({
        url: solutionUrl
    });

    // console.table([
    //     ["data", data],
    //     ["error", error],
    //     ["loading", loading]
    // ]);

    if (loading) return "LOADING";
    if (error) return "### Error occured, please try again later";
    if (data) return data;
    return "### Error occured, please try again later";
};
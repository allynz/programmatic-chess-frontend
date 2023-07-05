import { User } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import BACKEND from "../../configs/hostConfig";
import UserContext from "../../contexts/UserContext";

export const useSolution = (id: number): string => {
    const user = useContext(UserContext);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(undefined);
    const [data, setData] = useState<string>("");

    useEffect(() => {
        const updateData = async () => {
            setLoading(true);
            const { data, error } = await fetchData(user, id);
            setError(error);
            setData(data);
            setLoading(false);
        }

        updateData();
    }, [user]);

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

const fetchData = async (user: User | null, id: number) => {
    const solutionUrl = new URL(BACKEND + "/solution");
    solutionUrl.searchParams.set("problemId", String(id));

    // Http headers ignore trailing whitespace, so just handle that case in backend
    const userIdToken = await user?.getIdToken() || "";

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${userIdToken}`);
    try {
        const response = await fetch(solutionUrl.toString(), { headers });
        if (response.ok) {
            return {
                data: await response.json(),
                error: undefined
            };
        } else {
            throw new Error('Request failed with status code: ' + response.status);
        }
    } catch (err) {
        return {
            data: undefined,
            error: err
        }
    }
}
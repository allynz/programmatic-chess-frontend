import { User } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";

export const useAuthenticatedRequest = ({
    url
}: {
    url: URL
}): { loading: boolean, error: any, data: any } => {
    const user = useContext(UserContext);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(undefined);
    const [data, setData] = useState<any>(undefined);

    useEffect(() => {
        const updateData = async () => {
            setLoading(true);
            const { data, error } = await fetchData(user, url);
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

    return {
        loading: loading,
        error: error,
        data: data
    };
};

const fetchData = async (user: User | null, url: URL) => {

    // Http headers ignore trailing whitespace, so just handle that case in backend
    const userIdToken = await user?.getIdToken() || "";

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${userIdToken}`);

    try {
        const response = await fetch(url.toString(), { headers });
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
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { authenticate, logout } from "../../firebase/config";

const Page = () => {
    const user = useContext(UserContext);

    if (user) {
        return (<>
            WOHOO
            <button onClick={logout}>
                Log out
            </button>
        </>);
    } else {
        return (<>
            <button onClick={authenticate}>
                Sign in
            </button>

            <button onClick={logout}>
                Log out
            </button>
        </>);
    }
}

export default Page;
import { useContext } from "react";
import ProgressBarCustom from "../../components/general/progressBarCustom";
import UserContext from "../../contexts/UserContext";
import { authenticate, logout } from "../../firebase/config";

const Page = () => {
    return (<>
        <div
            style={{
                margin: "5rem"
            }}>
            <ProgressBarCustom />
        </div>
    </>);
}

export default Page;
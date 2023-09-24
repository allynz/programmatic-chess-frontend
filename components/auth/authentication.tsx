import { useContext } from "react";
import { Button } from "react-bootstrap";
import UserContext from "../../contexts/UserContext";
import { authenticate, logout } from "../../firebase/config";
import { EDITOR_AUTH_BACKDROP_INDEX } from "../config/zIndex";

// it should re-render when user object changes and all api calls should be done again
const AuthenticationWrapper = (props: any) => {
    const user = useContext(UserContext);

    return (
        <div
            // all style fields are imp except maybe templateRows(as row size is not changing)
            style={{
                height: "100%",
                width: "100%",
                display: "grid",
                gridTemplateRows: "100%",
                gridTemplateColumns: "100%"
            }}>
            <div style={{
                gridArea: "1/1/1/1"
            }}>
                {props.children}
            </div>

            {
                !user &&
                <GridBackDrop>
                    <SignInButton />
                </GridBackDrop>
            }
        </div>
    );
};

export default AuthenticationWrapper;

const GridBackDrop = (props: any) => {
    return (<>
        <div
            style={{
                // https://www.stefanjudis.com/today-i-learned/css-grid-can-be-used-to-stack-elements/
                gridArea: "1/1/1/1",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                // z-index is imp as elements may re-render and update stack
                zIndex: EDITOR_AUTH_BACKDROP_INDEX,
                backdropFilter: "blur(4px)"
            }}>
            {props.children}
        </div>
    </>);
};

// Add sign In with google at bottom, firebaseUI?, do what's fast for now
export const AuthButton = () => {
    const user = useContext(UserContext);

    if (user) {
        return <SignOutButton />;
    } else {
        return <SignInButton />;
    }
}

export const SignInButton = () => {
    return (<>
        <Button onClick={authenticate}>
            SIGN IN
        </Button>
    </>);
}

export const SignOutButton = () => {
    // can randomize the button color
    return (<>
        <Button variant="info" onClick={logout}>
            SIGN OUT
        </Button>
    </>);
}

// kept for legacy reasons even though dead code
const ZIndexBackDrop = () => {
    return (<>
        {/* allow events in the modal but not on the backdrop */}
        {/* have to keep the elements in order oterwise not working, not sure why as zIndex is set correctly, maybe because children doesnt have any specific positioning */}
        <div
            // dont use pointerEvents here as that possibly allows below interaction, prob that right now the clicks are happening but no event is there
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: "50",
                height: "100%",
                width: "inherit",
                // see which position is best
                // fixed clips but absolute does not clip
                // absolute does not respect parent height/width, so have to find alternatives
                position: "absolute"
            }}>
            <div
                style={{
                    zIndex: "100",
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white"
                }}>
                Hello
            </div>
        </div>
    </>);
}
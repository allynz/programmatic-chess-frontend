import { useContext } from "react";
import { Button } from "react-bootstrap";
import UserContext from "../../contexts/UserContext";
import { authenticate, logout } from "../../firebase/config";

// See if page re-renders after Sign In
// TODO: see if we need to render it from ssr as user can hide the html or CSS of backdrop
// see if we can do userIdToken auth without props
// make a general Modal library also for these type of containers, rather than whole page
// see if we can add transition, normal css property isn't working
// https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children
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
            <div style={{ gridArea: "1/1/1/1" }}>
                {/* make sure everything's rendered though as it will update the stack if any loaded becomes available etc. */}
                {/* TODO: how to get z-Index of this? So i can update in backdrop - but be careful, it may contain elements of it's own with more z-Index */}
                {/* make sure that this doesn't mess with child props - i.e they are not lost */}
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

// order it accordingle as to display
// manage z-index more properly later
const GridBackDrop = (props: any) => {
    return (<>
        <div
            style={{
                // https://www.stefanjudis.com/today-i-learned/css-grid-can-be-used-to-stack-elements/
                gridArea: "1/1/1/1",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                // z-index is imp as elements may re-render and update stack
                zIndex: "100"
            }}>
            {props.children}
        </div>
    </>);
};

export const AuthButton = () => {
    const user = useContext(UserContext);

    if (user) {
        return <SignOutButton />
    } else {
        return <SignInButton />
    }
}

// Provide these buttons based on users login status
export const SignInButton = () => {
    return (<>
        <Button onClick={authenticate}>
            SIGN IN
        </Button>
    </>);
}

export const SignOutButton = () => {
    return (<>
        <Button onClick={logout}>
            SIGN OUT
        </Button>
    </>);
}

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
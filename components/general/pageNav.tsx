import { User } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import UserContext from '../../contexts/UserContext';
import { AuthButton } from '../auth/authentication';
import { NAV_INDEX } from '../config/zIndex';
import ProgressBar from './progressBar';

type Props = {
    sticky?: boolean
};

const TopNavBar = ({ sticky }: Props) => {
    // useId hinders using selectors so added progressBar keyword in front
    const progressBarId: Readonly<string> = "progressBar-id";

    return (
        <div
            // overflow should be allowed here to display progress bar
            style={{
                height: "100%",
                position: sticky ? "sticky" : "static",
                // we can also change this also based on sticky property
                top: "0",
                zIndex: NAV_INDEX,
            }}>
            <NavBarElement />
            <ProgressBarElement id={progressBarId} />
        </div>
    );
};

export default TopNavBar;

const NavBarElement = () => {
    const user: User | null = useContext(UserContext);

    const Links = () => {
        return (<>
            <Link
                href='/problem/[id]'
                as={'/problem/1'}>
                <a>Problems</a>
            </Link>
            <Link href="/problem/2">
                <a>My Submissions</a>
            </Link>
            <Link href="/test/test">
                <a>About</a>
            </Link>
        </>);
    }

    return (<>
        <Navbar
            style={{
                height: "100%",
                width: "100%",
                overflow: "clip"
            }}
            sticky='top'
            bg="primary"
            variant="dark">
            {/* Crazy flex & grid sizing below */}
            <Container
                style={{
                    // weird, has some issues in responsive that is why set it like this and not directly width
                    minWidth: "95%",
                    display: "grid",
                    gridTemplateRows: "100%",
                    gridTemplateColumns: "10% 90%"
                }}>
                <Navbar.Brand
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    NavBar
                </Navbar.Brand>
                <div
                    style={{
                        marginLeft: "3rem",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            gap: "2rem"
                        }}>
                        <Links />
                    </div>
                    {/* Auth div */}
                    <div
                        style={{
                            display: "flex",
                            gap: "1.5rem"
                        }}>
                        <div
                            style={{
                                width: "2rem",
                                height: "2rem",
                                borderRadius: "2rem",
                                overflow: "clip",
                                backgroundColor: "red",

                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                            <Image
                                src={user?.photoURL || "https://unsplash.com/photos/s5kTY-Ve1c0"}
                                width={"100%"}
                                height={"100%"}
                                objectFit="cover" />
                        </div>
                        <AuthButton />
                    </div>
                </div>
            </Container>
        </Navbar>
    </>);
}

const ProgressBarElement = ({ id }: { id: string }) => {
    return (<>
        <div
            id={id}
            style={{
                height: "10px",
                width: "100%",
                backgroundColor: "transparent",
                // position:fixed has issues when scrolling
                position: "absolute",
                // needed if it overflows and blocks page interaction
                pointerEvents: "none",
                // since height is set, we can clip
                overflow: "clip"
            }}>
            <ProgressBar id={id} />
        </div>
    </>);
}
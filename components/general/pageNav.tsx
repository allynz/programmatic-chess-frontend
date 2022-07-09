import { User } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import UserContext from '../../contexts/UserContext';
import { AuthButton } from '../auth/authentication';
import { NAV_INDEX } from '../config/zIndex';
import ProgressBar from './progressBar';
import styles from '../../styles/UserImage.module.scss';

type Props = {
    sticky?: boolean,
    // height is needed for fixed position
    height?: string
};

const TopNavBar = ({ sticky, height }: Props) => {
    // useId hinders using selectors so added progressBar keyword in front
    const progressBarId: Readonly<string> = "progressbar-id";

    console.log("sticky", sticky);

    return (
        <div
            // overflow should be allowed here to display progress bar
            style={{
                height: height ? height : "7vh",
                width: "100%",
                position: sticky ? "sticky" : "static", // can't use sticky as viewport will be left on scroll, but have to specify height then if fixed is used
                // we can also change this also based on sticky property
                top: "0",
                zIndex: NAV_INDEX.toString(),
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
                href='/problem'>
                <a>PROBLEMS</a>
            </Link>
            <Link href="/submission">
                <a>MY SUBMISSIONS</a>
            </Link>
            <Link href="/about">
                <a>ABOUT</a>
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
            {/* Crazy flex & grid sizing below. Should we use CSS for such sizing? */}
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
                    {/* Most simple to read, write, and understand */}
                    CodingChess
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
                            gap: "1rem"
                        }}>
                        <UserImage />
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

// Can make a matrix style border but too much tinkering for now
export const UserImage = () => {
    const user = useContext(UserContext);

    if (!user) {
        return (<></>);
    }

    // TODO: improve default pic
    const defaultImage: string =
        "https://images.unsplash.com/photo-1562109245-d184fe2c81ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80";

    return (
        <div className={styles.outer}>
            <div className={styles.inner}>
                <Image
                    src={user?.photoURL || defaultImage}
                    width={"100%"}
                    height={"100%"}
                    layout="responsive"
                    objectFit="cover" />
            </div>
        </div>
    );
}
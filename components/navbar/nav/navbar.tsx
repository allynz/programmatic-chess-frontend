import Link from 'next/link';
import { Container, Navbar } from 'react-bootstrap';
import { AuthButton } from '../../auth/authentication';
import { UserImage } from '../userImage/userImage';
import styles from './Nav.module.scss';

const NavElement = () => {
    // seems NavLink is just <a> tag, see if we can use it here
    const Links = () => {
        return (<>
            <Link href='/problem'>
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
            className={styles.navbar}>
            {/* Crazy flex & grid sizing below. Should we use CSS for such sizing? */}
            <Container
                // for some reason, grid % not working in styles
                style={{
                    // has some issues in responsive that is why set it like this and not directly width
                    minWidth: "95%",
                    display: "grid",
                    gridTemplateRows: "100%",
                    gridTemplateColumns: "10% 90%"
                }}>
                <Navbar.Brand className='centered-container'>
                    {/* Most simple to read, write, and understand. Stop highlight on hover here but keep hand cursor */}
                    <Link href={"/"}>
                        CodingChess
                    </Link>
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
                            gap: "1.1rem"
                        }}>
                        <UserImage />
                        <AuthButton />
                    </div>
                </div>
            </Container>
        </Navbar>
    </>);
}

export default NavElement;
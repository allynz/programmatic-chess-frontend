import {
    Nav, NavItem,
    NavLink
} from 'react-bootstrap';
import { CheckCircleFill } from "react-bootstrap-icons";

type Props = {
    navKeys: Array<string>,
    isSolved: boolean
};

const NavElement = ({ navKeys, isSolved }: Props) => {
    return (<>
        <Nav variant="pills">
            {
                navKeys?.map((navKey: string) =>
                (
                    // LATER: check spacing between Nav items in specific Problem page, improve it if poss. For now seems fine
                    <NavItem
                        key={navKey}
                        className={`pointer`}>
                        <NavLink
                            eventKey={navKey}>
                            {navKey.toUpperCase()}
                        </NavLink>
                    </NavItem>
                ))
            }
            {
                isSolved ?
                    <div style={{ marginLeft: "1rem" }}><CheckCircleFill height={40} size={30} color={'green'} /></div>
                    :
                    <></>
            }
        </Nav>
    </>);
}

export default NavElement;
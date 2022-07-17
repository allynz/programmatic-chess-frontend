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
                    // TODO: check spacing between Navs, improve it if poss
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
                    <div><CheckCircleFill height={40} size={30} color={'green'} /></div>
                    :
                    <></>
            }
        </Nav>
    </>);
}

export default NavElement;
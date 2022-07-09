import React from "react";
import {
    Nav, NavItem,
    NavLink
} from 'react-bootstrap';

type Props = {
    navKeys: Array<string>
};

const NavElement = ({ navKeys }: Props) => {
    return (<>
        <Nav variant="pills">
            {
                navKeys?.map((navKey: string) =>
                (
                    // TODO: check spacing between Navs, improve it if poss
                    <NavItem
                        key={navKey}
                        style={{
                            cursor: "pointer"
                        }}>
                        <NavLink
                            eventKey={navKey}>
                            {navKey.toUpperCase()}
                        </NavLink>
                    </NavItem>
                ))
            }
        </Nav>
    </>);
}

export default NavElement;
import React from "react";
import {
    Nav, NavItem,
    NavLink
} from 'react-bootstrap';

const NavElement = ({ navKeys }: any) => {
    return (<>
        <Nav variant="pills">
            {
                navKeys?.map((navKey: string) =>
                (<>
                    <NavItem style={{ cursor: "pointer" }}>
                        <NavLink eventKey={navKey}>
                            {navKey.toUpperCase()}
                        </NavLink>
                    </NavItem>
                </>))
            }
        </Nav>
    </>);
}

export default NavElement;
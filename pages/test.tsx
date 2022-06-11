import type { NextPage } from 'next'
import React from 'react';
import {
    Nav,
    Row,
    Col,
    Tab,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    TabContainer
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getFirestoreSubmissionCollectionData } from "../firebase/hook"
import {
    HorizontalPageSplit,
    VerticalPageSplit
} from 'react-page-split';
import 'react-page-split/style.css';

const Test: NextPage = () => {
    return (
        <Col>
            <Row>
                <Nav variant="pills">
                    <NavItem>
                        <NavLink href="/home">Active</NavLink>
                    </NavItem>
                    <NavItem style={{ cursor: "pointer" }}>
                        <Nav.Link eventKey="link-1">Link</Nav.Link>
                    </NavItem>
                    <NavItem style={{ cursor: "pointer" }}>
                        <NavLink eventKey="link-2">Link</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink eventKey="disabled" disabled>
                            Disabled
                        </NavLink>
                    </NavItem>
                </Nav>
            </Row>
        </Col>
    )
}

export default Test
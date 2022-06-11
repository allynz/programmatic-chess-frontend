import Link from "next/link";
import React from "react";
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
import { getFirestoreSubmissionCollectionData } from "../firebase/hook"
import ReactMarkdown from "react-markdown";

// just for rendering, do not do any fetching here, just use params to render
function ProblemDisplay({ problem }: any) {
    console.log("pp: ", problem);

    return (
        <div
            style={{
                margin: "2rem",
                height: "90%", // make it inside the box so we cant scroll on it horizontally
                display: "flex",
                width: "auto",
                overflow: "clip"
            }}>
            <TabContainer defaultActiveKey="problem">
                <Col style={{ overflow: "clip" }}> {/** Required to clip horizontal scrolling on overflow */}
                    <Row>
                        <Nav style={{ margin: "1rem" }} variant="tabs">
                            <NavItem style={{ cursor: "pointer" }}>
                                <NavLink eventKey="problem">Problem</NavLink>
                            </NavItem>
                            <NavItem style={{ cursor: "pointer" }}>
                                <NavLink eventKey="solution">Solution</NavLink>
                            </NavItem>
                            <NavItem style={{ cursor: "pointer" }}>
                                <NavLink eventKey="submissions">Submissions</NavLink>
                            </NavItem>
                            <NavItem style={{ cursor: "pointer" }}>
                                <NavLink eventKey="disabled" disabled>
                                    Disabled
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Row>
                    <TabContent
                        style={{
                            overflow: "scroll",
                            overflowWrap: "break-word",
                            height: "80%",
                            margin: "1rem"
                        }}>
                        <TabPane eventKey="problem">
                            <ReactMarkdown>{problem.statement}</ReactMarkdown>
                        </TabPane>
                        <TabPane eventKey="solution">
                            <ReactMarkdown>{problem.solution}</ReactMarkdown>
                        </TabPane>
                        <TabPane eventKey="submissions">
                            {getFirestoreSubmissionCollectionData()}
                        </TabPane>
                    </TabContent>
                </Col>
            </TabContainer>
        </div>
    );

    // return (<>
    //     <div>
    //         {/**Make Nav sticky if possible, may have to use JS since it is inside another div */}
    //         <Tabs
    //             style={{
    //                 width: "auto",
    //                 borderStyle: "dashed",
    //                 display: "flex"
    //             }}
    //             defaultActiveKey="submissions" id="uncontrolled-tab-example" className="mb-3">
    //             <Tab eventKey="problem" title="Problem">
    //                 {/** New line rendering is a mess in react, but we can do some CSS for now. Hmmm react-markdown does support new lines so I guess we can just use that for now*/}
    //                 <ReactMarkdown>{problem.statement}</ReactMarkdown>
    //             </Tab>
    //             <Tab eventKey="solution" title="Solution">
    //                 <ReactMarkdown>{problem.solution}</ReactMarkdown>
    //             </Tab>
    //             <Tab style={{ overflow: "scroll", height: "20%" }} eventKey="submissions" title="Submissions">
    //                 {/* Can we /api here? */}
    //                 <div>
    //                     <ul>
    //                         <li> line 1 </li>
    //                         <li> line 2 </li>
    //                         <li> line 3 </li>
    //                         <li> line 4 </li>
    //                         <li> line 5 </li>
    //                         <li> line 6 </li>
    //                         <li> line 7 </li>
    //                         <li> line 8 </li>
    //                         <li> line 9 </li>
    //                         <li> line 10 </li>
    //                         <li> line 11 </li>
    //                         <li> line 12 </li>
    //                         <li> line 13 </li>
    //                         <li> line 14 </li>
    //                         <li> line 15 </li>
    //                         <li> line 16 </li>
    //                         <li> line 17 </li>
    //                         <li> line 18 </li>
    //                         <li> line 19 </li>
    //                         <li> line 20 </li>
    //                         <li> line 6 </li>
    //                         <li> line 7 </li>
    //                         <li> line 8 </li>
    //                         <li> line 9 </li>
    //                         <li> line 10 </li>
    //                         <li> line 11 </li>
    //                         <li> line 12 </li>
    //                         <li> line 13 </li>
    //                         <li> line 14 </li>
    //                         <li> line 15 </li>
    //                         <li> line 16 </li>
    //                         <li> line 17 </li>
    //                         <li> line 18 </li>
    //                         <li> line 19 </li>
    //                         <li> line 20 </li>
    //                         <li> line 6 </li>
    //                         <li> line 7 </li>
    //                         <li> line 8 </li>
    //                         <li> line 9 </li>
    //                         <li> line 10 </li>
    //                         <li> line 11 </li>
    //                         <li> line 12 </li>
    //                         <li> line 13 </li>
    //                         <li> line 14 </li>
    //                         <li> line 15 </li>
    //                         <li> line 16 </li>
    //                         <li> line 17 </li>
    //                         <li> line 18 </li>
    //                         <li> line 19 </li>
    //                         <li> line 20 </li>
    //                         <li> line 6 </li>
    //                         <li> line 7 </li>
    //                         <li> line 8 </li>
    //                         <li> line 9 </li>
    //                         <li> line 10 </li>
    //                         <li> line 11 </li>
    //                         <li> line 12 </li>
    //                         <li> line 13 </li>
    //                         <li> line 14 </li>
    //                         <li> line 15 </li>
    //                         <li> line 16 </li>
    //                         <li> line 17 </li>
    //                         <li> line 18 </li>
    //                         <li> line 19 </li>
    //                         <li> line 20 </li>
    //                         <li> line 6 </li>
    //                         <li> line 7 </li>
    //                         <li> line 8 </li>
    //                         <li> line 9 </li>
    //                         <li> line 10 </li>
    //                         <li> line 11 </li>
    //                         <li> line 12 </li>
    //                         <li> line 13 </li>
    //                         <li> line 14 </li>
    //                         <li> line 15 </li>
    //                         <li> line 16 </li>
    //                         <li> line 17 </li>
    //                         <li> line 18 </li>
    //                         <li> line 19 </li>
    //                         <li> line 20 </li>

    //                     </ul>
    //                 </div>
    //             </Tab>
    //             <Tab eventKey="contact" title="Contact" disabled>
    //                 {/* Submissions data cannot be static so we need to fetch it through hooks 
    //                 Also add logic to only poll when the tab is clicked and open, otherwise not much use as it will increase latency
    //                 */}
    //                 WOOO
    //             </Tab>
    //         </Tabs>
    //     </div>
    // </>)
}

export const navLinks = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "About Us",
        path: "/about",
    },
    {
        name: "Services",
        path: "/services",
    },
    {
        name: "Blog",
        path: "/blog",
    },
    {
        name: "Contact Us",
        path: "#contact",
    },
];

export default ProblemDisplay;
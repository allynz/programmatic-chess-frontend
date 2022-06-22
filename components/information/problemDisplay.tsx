import React from "react";
import {
    Col, TabContainer
} from 'react-bootstrap';
import ReactMarkdown from "react-markdown";
import { getSubmissionCollectionDataHook } from "../../firebase/hook";
import NavElement from "./navElement";
import TabContentElement from "./tabContentElement";

// just for rendering, do not do any fetching here, just use params to render
// TODO: See typescript correct way to add typess
function ProblemDisplay({ problem }: any) {
    // see if we can make this a List<POJOModel> to assert type checks
    const dataMap = [
        {
            key: "problem",
            renderContent: <ReactMarkdown>{problem.statement}</ReactMarkdown>
        },
        {
            key: "solution",
            renderContent: <ReactMarkdown>{problem.solution}</ReactMarkdown>
        },
        {
            key: "submissions",
            renderContent: getSubmissionCollectionDataHook() // it does update even in const var, wow!
        },
        {
            key: "playground",
            renderContent: <>Chessboard with tinkering opportunities</>
        }
    ];

    return (<> {/** should I put it unnecessarily? */}
        {/** Top level margins are put better here as I can adjust margins inside here, outside I don't know how much to put */}
        <TabContainer defaultActiveKey={dataMap.at(0)?.key}>
            <Col // this is the actual container of things, see if <Col> can help out in any sizing
                style={{
                    height: "100%", // important! to contain the div
                    width: "auto",
                    overflow: "visible", /**Kept visible for now to show nav visibility but if horizontal overflow occurs, we can clip to disable scrolling */
                    //display: "flex", // flex is better than grid here as it auto sizes
                    //flexDirection: "column",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    padding: "1rem"
                }}>
                <NavElement navKeys={dataMap.map(v => v.key)} />
                <TabContentElement dataMap={dataMap} />
            </Col>
        </TabContainer>
    </>);
}

export default ProblemDisplay;
import React from "react";
import {
    TabContent,
    TabPane
} from 'react-bootstrap';

// TODO: Fix prop type, also in render element
const TabContentElement = ({ dataMap }: any) => {
    return (<>
        <TabContent
            style={{
                overflow: "scroll",
                // needed to view table correctly, and enable scrolling on it
                overflowWrap: "break-word",
                wordWrap: "break-word",
                width: "auto",
                marginTop: "1rem",
                marginBottom: "1rem"
            }}>
            {
                dataMap.map(
                    (res: any) => (
                        <TabPane
                            key={res.key}
                            eventKey={res.key}>
                            {res.renderContent}
                        </TabPane>
                    ))
            }
        </TabContent>
    </>);
};

export default TabContentElement;
import React from "react";
import {
    TabContent,
    TabPane
} from 'react-bootstrap';

// Make first load of each tab on client side rendering if poss
const TabContentElement = ({ dataMap }: any) => {
    return (<>
        <TabContent
            style={{
                overflow: "scroll",
                overflowWrap: "break-word",
                wordWrap: "break-word", /** better than overflowWrap as that does not break the word completely - hmm both dont seem to be working though */
                width: "auto",
                // make sure the container is visible
                // cannot use height: 100% for this otherwise margins wont work
                // in general dont put height and margin properties together as then sizing will be unknown, especially in flex
                // height doesnt include margin so use padding
                // the only issue with padding is scrolling!!
                // I really need margin though so use it with percentages
                // Finally I've done it, keeping height auto works here I guess coz of flex, does it auto size containers in margin? Amazing if that's the case
                marginTop: "1rem",
                marginBottom: "1rem"
            }}>
            {/** New line rendering is a mess in react, but we can do some CSS for now. Hmmm react-markdown does support new lines so I guess we can just use that for now*/}
            {/* Submissions data cannot be static so we need to fetch it through hooks 
            Also add logic to only poll when the tab is clicked and open, otherwise not much use as it will increase latency
            */}
            {
                dataMap.map((res: any) => (
                    <TabPane eventKey={res.key}>
                        {res.renderContent}
                    </TabPane>
                ))
            }
        </TabContent>
    </>);
};

export default TabContentElement;
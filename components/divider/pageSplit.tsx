import { useState } from 'react';
import {
    HorizontalPageSplit, PageSplitPanelSize
} from 'react-page-split';
import 'react-page-split/style.css';
import CustomDivider from "./customDivider";

const ZERO_WIDTH = "0rem";
const MIN_WIDTH_DEFAULT = "30rem";

const PageSplitWrapper = ({ panels }: { panels: Array<any> }) => {

    // keep widths so that playground is visible correctly even on resize
    const [elementMinWidth, setElementMinWidth] = useState<string>(MIN_WIDTH_DEFAULT);
    const [widths, setWidths] = useState<PageSplitPanelSize[]>(['', '']);

    // LATER: Better make it absolute widths as viewport size can be reduced with opening console and resizing. Top minWidth are set so don't worry about it
    const resetMinWidths = () => setElementMinWidth(MIN_WIDTH_DEFAULT);
    const disableMinWidths = () => setElementMinWidth(ZERO_WIDTH);

    return (<>
        <HorizontalPageSplit
            // cant use onMouseDown, it triggers even on clicking the element, not just the divider. Cannot put in divider as it already has a mousedown handler

            // boundingSize is called at first click, so we use it to our advantage to reset min widths
            // LATER: it is causing console errors which are fine for now, we can fix those later on, no issue in usability. Probably have to refactor this usage, cannot find simple fix
            boundingSize={(e) => {
                resetMinWidths();
                // return default value
                return e.getBoundingClientRect().width;
            }}
            widthProperty='width'
            widths={widths}
            divider={props =>
                <CustomDivider
                    onLeftButtonClick={
                        () => {
                            disableMinWidths();
                            setWidths(['0%', '100%']);
                        }
                    }
                    onRightButtonClick={
                        () => {
                            disableMinWidths();
                            setWidths(['100%', '0%']);
                        }
                    }
                    props={props} />
            }
            style={{
                height: "100%",
                overflow: "clip"
            }}>
            {panels.map(panel => panel(elementMinWidth))}
        </HorizontalPageSplit>
    </>);
};

export default PageSplitWrapper;
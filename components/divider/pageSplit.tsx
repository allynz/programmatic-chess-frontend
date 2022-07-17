import { useState } from 'react';
import {
    HorizontalPageSplit, PageSplitPanelSize
} from 'react-page-split';
import 'react-page-split/style.css';
import CustomDivider from "./customDivider";

const PageSplitWrapper = ({ panels }: { panels: Array<any> }) => {
    const minWidthDefault = "30rem";

    // keep widths so that playground is visible correctly even on resize
    const [elementMinWidth, setElementMinWidth] = useState<string>(minWidthDefault);
    const [widths, setWidths] = useState<PageSplitPanelSize[]>(['', '']);

    // TODO: Better make it absolute widths as viewport size can be reduced with opening console and resizing
    const resetMinWidths = () => setElementMinWidth(minWidthDefault);
    const disableMinWidths = () => setElementMinWidth("0rem");

    console.log(elementMinWidth);

    return (<>
        <HorizontalPageSplit
            // boundingSize is called at first click, so we use it to our advantage to reset min widths
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
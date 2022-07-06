import type { NextPage } from 'next';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import {
    HorizontalPageSplit,
    HorizontalPageSplitDividerProps,
    PageSplitPanelSize,
    usePageSplitDivider
} from 'react-page-split';
import 'react-page-split/style.css';
import CustomDividerReal from '../../components/general/customDivider';
import styles from '../../styles/Divider.module.css';
import { eq } from '../../utilities/equals';

const Test: NextPage = () => {
    return (<>
        <RealDivider />
    </>)
}

// later use advanced movements to set widths to 0 or required size, and not just clicks
const RealDivider = () => {
    const [minWidths, setMinWidths] = useState({
        leftMinWidth: "30%",
        rightMinWidth: "30%"
    });
    const [widths, setWidths] =
        useState<PageSplitPanelSize[]>(['', '']);

    const resetMinWidths = () => {
        const requiredMinWidths = {
            leftMinWidth: "30%",
            rightMinWidth: "30%"
        };

        // seems equality checks are failing, not sure why
        setMinWidths(requiredMinWidths);
    }

    const disableMinWidths = () => {
        const requiredMinWidths = {
            leftMinWidth: "0",
            rightMinWidth: "0"
        };

        // seems equality checks are failing, not sure why
        setMinWidths(requiredMinWidths);
    }

    return (<>
        <HorizontalPageSplit
            // boundingSize is called at first click, so we can use it to our advantage
            boundingSize={(e) => {
                const vv: number = e.getBoundingClientRect().width;
                console.log(vv);
                // only set if minWidths are at 0
                resetMinWidths();
                return vv;
            }}
            widthProperty='width'
            widths={widths}
            divider={
                props =>
                    <CustomDividerReal
                        onLeftButtonClick={
                            () => {
                                // only set the correct side width
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
                        {...props} />
            }
            style={{
                height: "100vh",
                width: "100vw"
            }}>
            <div
                style={{
                    backgroundColor: "green",
                    minWidth: minWidths.leftMinWidth
                }}>
                <div style={{ margin: "5rem", boxShadow: "0px 0px 1rem 1rem blue" }}>
                    33
                </div>
            </div>
            <div
                style={{
                    backgroundColor: "red",
                    minWidth: minWidths.rightMinWidth
                }} />
        </HorizontalPageSplit>
    </>);
};

export default Test
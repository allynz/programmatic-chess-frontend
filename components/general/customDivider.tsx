import { Button } from 'react-bootstrap';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import {
    usePageSplitDivider
} from 'react-page-split';
import 'react-page-split/style.css';
import styles from '../../styles/Divider.module.css';

// Good options: https://michaelbull.github.io/react-page-split/?path=/docs/basic--horizontal, not sure how to use them though
export default function CustomDividerReal(props: any) {
    //console.log(props);
    const { index, onLeftButtonClick, onRightButtonClick } = props;

    const {
        className: classNameProp,
        children,
        ...rest
    } = usePageSplitDivider(props);

    const classNames = `custom-divider ${classNameProp} ${styles.divider}`;

    return (
        <div
            className={classNames}
            {...rest}>
            {/* Make buttons circular */}
            <Button
                onClick={onLeftButtonClick}
                style={{
                    position: "absolute",
                    marginRight: "2rem",
                    zIndex: "2000"
                }}>
                <ArrowLeft />
            </Button>
            <Button
                onClick={onRightButtonClick}
                style={{
                    position: "absolute",
                    marginLeft: "2rem",
                    zIndex: "2000"
                }}>
                <ArrowRight />
            </Button>
        </div>
    );
}
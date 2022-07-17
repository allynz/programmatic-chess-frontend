import { usePageSplitDivider } from 'react-page-split';
import 'react-page-split/style.css';
import styles from '../../styles/Divider.module.css';
import { LeftButtonDivider, RightButtonDivider } from './buttons';

// Good options: https://michaelbull.github.io/react-page-split/?path=/docs/basic--horizontal, not sure how to use them though
export default function CustomDivider({
    onLeftButtonClick,
    onRightButtonClick,
    props
}: any) {
    const { index } = props;

    const {
        className: classNameProp,
        children,
        ...rest
    } = usePageSplitDivider(props);

    const classNames = `custom-divider ${classNameProp} ${styles.divider}`;

    return (
        <div
            style={{
                // TODO: manage it through config
                zIndex: "40"
            }}
            className={classNames}
            {...rest}>
            <LeftButtonDivider
                onClick={onLeftButtonClick} />
            <RightButtonDivider
                onClick={onRightButtonClick} />
        </div>
    );
}
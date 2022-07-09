import { Button } from 'react-bootstrap';
import { ArrowUp } from 'react-bootstrap-icons';
import 'react-page-split/style.css';
import styles from '../../styles/Semicircle.module.scss';

export const LeftButtonDivider = (
    { onClick }: { onClick: () => void }
) => {
    return (<>
        <Button
            onClick={onClick}
            className={styles.halfCircleLeft}>
            <ArrowUp
                size={15} />
        </Button>
    </>);
}

export const RightButtonDivider = (
    { onClick }: { onClick: () => void }
) => {
    return (<>
        <Button
            onClick={onClick}
            className={styles.halfCircleRight}>
            <ArrowUp
                size={15} />
        </Button>
    </>);
}
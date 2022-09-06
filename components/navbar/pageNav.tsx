import NavElement from './nav/navbar';
import styles from './Navbar.module.scss';
import ProgressBar from './progressBar';

type Props = {
    sticky?: boolean
};

const TopNavBar = ({ sticky }: Props) => {
    const cssClasses =
        `${styles.navbarWrap}` +
        ` ` +
        (sticky ? `${styles.sticky}` : ``);

    return (
        <div className={cssClasses}>
            <NavElement />
            <ProgressBarElement />
        </div>
    );
};

export default TopNavBar;

const ProgressBarElement = () => {
    // useId hinders using selectors so added progressBar keyword in front
    const id: Readonly<string> = "progressbar-id";

    return (<>
        <div
            id={id}
            className={`${styles.progressBarWrap}`}>
            <ProgressBar id={id} />
        </div>
    </>);
}
import styles from '../../styles/Problem.module.css'

// Make it same across all pages, or atleast present
// It will contain profile details and some buttons like submissions Tab, About etc.
// It's dimensions should be handled by the corresponding page, although it should have same everywhere, like all content is loaded below it using ajax
const PageNav = () => {
    return (<>
        <div className={styles.nav}></div>
    </>);
};

export default PageNav;
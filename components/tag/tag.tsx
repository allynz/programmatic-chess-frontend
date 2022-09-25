import styles from '../../styles/easyTagAnimation.module.scss';

// TODO: also need to sort by tag for problems
const Tag = ({ name }: any) => {
    switch (name) {
        case 'easy':
            return (
                <TagBone
                    name={name}
                    color={`white`}
                    backgroundColor={`#ff6666`} />);
        case 'medium':
            return (
                <TagBone
                    name={name}
                    color={`white`}
                    backgroundColor={`red`} />);
        case 'hard':
            return (
                <TagBone
                    name={name}
                    color={`white`}
                    backgroundColor={`#cc0000`} />);
        case 'new':
            return (
                <p className={styles.animation}>
                    {name.toUpperCase()}
                </p>
            );
        default:
            return <TagBone />
    }
};

export default Tag;

const TagBone = ({ name, color, backgroundColor }: any) => {
    return (<>
        <p
            style={{
                color: color,
                backgroundColor: backgroundColor,
                paddingLeft: "0.2rem",
                paddingRight: "0.2rem",
                textAlign: "center",
                fontWeight: "bolder"
            }}>
            {name.toUpperCase()}
        </p>
    </>);
}
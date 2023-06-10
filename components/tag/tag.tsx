import styles from '../../styles/easyTagAnimation.module.scss';

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
        // LATER: Can we detect new based on the timestamp of addition or something, that way I don't manually tag them
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
                fontWeight: "bolder",
                lineHeight: "1.5rem"
            }}>
            {name.toUpperCase()}
        </p>
    </>);
}
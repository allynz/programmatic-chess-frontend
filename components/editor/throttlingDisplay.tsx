
// TODO: Fix after rate limiting thinking is done
const ThrottlingDisplay = () => {
    return (<>
        <div
            style={{
                height: "100%",
                width: "100%",
                paddingLeft: "5px"
            }}>
            Current submissions remaining: 10
        </div>
    </>);
};

export default ThrottlingDisplay;
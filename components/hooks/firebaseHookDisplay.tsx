import Loading from "../general/loading";

// LATER: Fix types. Seems `any` is good here
const FirebaseHookDisplay = ({
    value,
    error,
    loading,
    content
}: {
    value: any,
    error: any,
    loading: any,
    content: (s: any) => any
}) => {
    if (error) {
        return (<strong>Error, please try again</strong>);
    } else if (loading) {
        return (<Loading />);
    } else if (value) {
        return content(value);
    } else {
        return (<strong>Unknown Error, please try again</strong>);
    }
};

export default FirebaseHookDisplay;

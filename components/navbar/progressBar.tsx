import NextNProgress from "nextjs-progressbar";
import { useState } from "react";

type Props = {
    // id of the container containing the progressbar. if not defined in options bloack, document body is used
    id?: string
}

// The scrolling to the top effect on Submissions page is awesome
const ProgressBar = ({ id }: Props) => {
    const [options, setOptions] = useState<any>({
        speed: 200,
        trickleSpeed: 150,
        easing: "ease",
        showSpinner: false,
        parent: "#" + id
    });

    return (<>
        <NextNProgress
            height={5}
            stopDelayMs={200}
            color='purple'
            startPosition={0.2}
            // https://github.com/rstacruz/nprogress#configuration
            options={options} />
    </>);
}

export default ProgressBar;
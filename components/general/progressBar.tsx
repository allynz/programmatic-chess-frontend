import NextNProgress from "nextjs-progressbar";
import { useState } from "react";

type Props = {
    // id of the container containing the progressbar. if not defined, document body is used
    id?: string
}

// There is some issue with shifting to pages with no Nav, as the classname is not present, but if we perform a full refresh then it will be gone
// or we should change it's container dynamically using Routes.on or something. Seems like we have to use Nav everywhere, or set progressBar to body of page, or make your own Progressbar
const ProgressBar = ({ id }: Props) => {
    // see realistic options for this - more than half should be reached before completing
    // it should like actually loading - also see if we can make such a thing to see how much content is remaining etc.

    // prob don't use setState as it won't update when barId changes, do I want that though or should we keep it constant
    const [options, setOptions] = useState<any>({
        speed: 300,
        trickleSpeed: 50,
        easing: "ease",
        showSpinner: false,
        // have fallback options for parent in your custom bar, as fallbacks, and body at the end of fallback
        parent: "#" + id
    });

    return (<>
        <NextNProgress
            stopDelayMs={200}
            color='red'
            startPosition={0.2}
            // https://github.com/rstacruz/nprogress#configuration
            options={options} />
    </>);
}

export default ProgressBar;
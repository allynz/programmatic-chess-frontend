import TopNavBar from "./pageNav";

const navHeight: string = "8vh";
// or can use this: //const remainingVH: string = (100 - parseInt(navHeightVH.at(0) || '0')) + "vh";
const remainingViewportHeight: string = "92vh";

type Props = {
    stickyNav?: boolean,
    constrainToViewport?: boolean,
    children: any
};

const PageWrapNav = ({
    stickyNav,
    constrainToViewport,
    children
}: Props) => {
    if (stickyNav) {
        if (constrainToViewport) {
            return (<>
                <ViewportConstrain>
                    <TopNavBar sticky />
                    {/* make sure children is just 1 element or wrap with div for safety, but see div sizing if wrapped, works for now */}
                    {children}
                </ViewportConstrain>
            </>);
        } else {
            return (<>
                <TopNavBar sticky />
                {children}
            </>);
        }
    } else if (constrainToViewport) {
        return (<>
            <ViewportConstrain>
                <TopNavBar />
                {/* make sure children is just 1 element or wrap with div for safety but wrapping with div causes other issues so left for now */}
                {children}
            </ViewportConstrain>
        </>);
    } else {
        // no options, simple stack
        return (<>
            <TopNavBar />
            {children}
        </>);
    }
};

export default PageWrapNav;

// keep it private within this file
const ViewportConstrain = ({ children }: any) => {
    return (<>
        <div
            style={{
                height: "100vh",
                width: "100vw",

                // min dimensions needed as resizing can happen
                // guess I need to add here separately also for it to work correctly
                // LATER: somehow combine this and top level dimensions, maybe css property would be a good start
                minHeight: "40rem",
                // tested all pages to set correct field
                minWidth: "90rem",

                overflow: "clip",
                display: "flex",
                flexDirection: "column"
                // sizing of elements depend on the container so have to provide percentages
                //gridTemplateRows: "auto 90%", // also adjust with non constrained Nav so that Nav height remains same across pages
                //gridTemplateColumns: "100%"
                // have elements handle their overflow on their own, like in submissions page, although this is constrained viewport so ideally that shouldn't happen
            }}>
            {children}
        </div>
    </>);
}
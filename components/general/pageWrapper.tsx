import TopNavBar from "./pageNav";

type Props = {
    stickyNav?: boolean,
    constrainToViewport?: boolean,
    children: any
};

// should we have a full-stretch div element also, although that should be handled by class="full-strectch" on a div using tailwind
// and div functionality would be lost
// separate constrain to viewport and stick nav elements is poss
// TODO: Have nav height same across all pages
// make sure it doesn't interfere with other floating zIndex divs
const PageWrapNav = ({ stickyNav, constrainToViewport, children }: Props) => {
    console.log(children);

    if (stickyNav) {
        if (constrainToViewport) {
            return (<>
                <ViewportConstrain>
                    <TopNavBar sticky />
                    {/* make sure children is just 1 element or wrap with div for safety */}
                    <div>
                        {children}
                    </div>
                </ViewportConstrain>
            </>);
        } else {
            return (<>
                <div
                    style={{
                        height: "5vh",
                        width: "100%"
                    }}>
                    <TopNavBar sticky />
                </div>
                {children}
            </>);
        }
    } else if (constrainToViewport) {
        return (<>
            <ViewportConstrain>
                <TopNavBar />
                {/* make sure children is just 1 element or wrap with div for safety */}
                <div>
                    {children}
                </div>
            </ViewportConstrain>
        </>);
    } else {
        return (<>
            <div
                style={{
                    height: "5vh",
                    width: "100%"
                }}>
                <TopNavBar />
            </div>
            {children}
        </>);
    }
};

export default PageWrapNav;

// only use for this class
const ViewportConstrain = ({ children }: any) => {
    // is it a good idea to wrap <></> everywhere?
    return (<>
        <div
            style={{
                height: "100vh",
                width: "100vw",
                overflow: "clip",
                display: "grid",
                // sizing of elements depend on the container so have to provide percentages
                gridTemplateRows: "5% 95%", // also adjust with non constrained Nav so that Nav height remains same across pages
                gridTemplateColumns: "100%"
                // have elements handle their overflow on their own, like in submissions page
            }}>
            {children}
        </div>
    </>);
}
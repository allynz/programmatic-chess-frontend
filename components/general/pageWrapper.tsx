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
    console.log(children);

    if (stickyNav) {
        if (constrainToViewport) {
            return (<>
                <ViewportConstrain>
                    <TopNavBar height={navHeight} sticky />
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
                        height: navHeight,
                        width: "100%"
                    }}>
                    <TopNavBar height={navHeight} sticky />
                </div>
                {children}
            </>);
        }
    } else if (constrainToViewport) {
        return (<>
            <ViewportConstrain>
                <TopNavBar height={navHeight} />
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
                    height: navHeight,
                    width: "100%"
                }}>
                <TopNavBar height={navHeight} />
            </div>
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
                overflow: "clip",
                display: "grid",
                // sizing of elements depend on the container so have to provide percentages
                gridTemplateRows: navHeight + " " + remainingViewportHeight, // also adjust with non constrained Nav so that Nav height remains same across pages
                gridTemplateColumns: "100%"
                // have elements handle their overflow on their own, like in submissions page, although this is constrained viewport so ideally that shouldn't happen
            }}>
            {children}
        </div>
    </>);
}
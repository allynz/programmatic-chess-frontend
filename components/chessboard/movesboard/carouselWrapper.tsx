import { useEffect, useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// goes to slide idx directly, no need to add extra logic
// https://stackoverflow.com/questions/66136068/how-to-have-a-loading-screen-until-all-my-components-are-mounted-in-react
// LATER: make width equal to length of 3 child divs, have childs handle padding, then it centers correctly, can do this resizing using stateful variables also but whatever
// In general, we should not have any useState for the variables of this class as it will re-render the Board, or make the Board separate from inside Carousel
// LATER: there is some sizing issue in `Carousel` element which doesnt let flex-shrink work, fine for now tho as we can see details on movesListDisplay on left side
const CarouselWrapper = ({ lodingParentState, lodingParentStateFalse, movesList, idx }: any) => {
    //const prevIdx: number = usePrevious(idx) || idx; // should we shift this inside useEffect?, doesnt seem necessary
    const carouselRef = useRef<Carousel | null>();
    // watch out for fast buttoning, its having some issue
    useEffect(() => {
        // Read more about skipBeforeChange, seems it is skipping some callbacks on fast clicks
        carouselRef.current?.goToSlide(idx); // keep in mind we added extra div in beg and end
    }, [idx]);

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
            partialVisibilityGutter: 0
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            partialVisibilityGutter: 40
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
            partialVisibilityGutter: 0
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            partialVisibilityGutter: 0
        }
    };
    return (<>
        {/* Make faster transitions, try using customerTransition */}
        <Carousel
            transitionDuration={100} // what does this mean? it does make it fast though and prevents unwanted errors on fast clicking. It does control the loading and button gap though
            beforeChange={lodingParentState}
            afterChange={lodingParentStateFalse}
            ref={(el) => {
                carouselRef.current = el; // better use this rather than this.Carousel, also see diff betn useState and useRef
            }}
            responsive={responsive}
            infinite={false}
            arrows={false}>
            <div />
            {
                movesList.map(
                    (move: any, index: number) =>
                    (
                        <div
                            key={index} // this is fine as it will not change later on
                            style={{
                                minWidth: "fit-content", // for status message and long texts
                                fontSize: "small",
                                height: "auto",
                                backgroundColor: index === idx ? "aqua" : "grey",
                                border: "2px solid white",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                transition: "background-color 300ms ease-in-out" // this is cool, match with slide duration which defaults to 300ms
                            }}>
                            {move}
                        </div>
                    ))
            }
            <div />
        </Carousel>
    </>);
};

export default CarouselWrapper;
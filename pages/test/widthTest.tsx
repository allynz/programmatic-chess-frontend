import { ListGroup } from "react-bootstrap";

const Page = () => {
    const li = [...Array(6)].map(i => "Heldsfsdgnsdngsdngjnsdkglo");
    const v1 = "ddddddndkjsnfdjsnnggejrf";

    return (<>
        <div
            style={{
                margin: "5rem"
            }}>
            <div
                style={{
                    overflow: "scroll",
                    whiteSpace: "nowrap",
                    boxShadow: "0px 0px 5px 2px lightgreen"
                }}>
                <ListGroup horizontal>
                    {
                        li.map((val, idx) => (
                            <ListGroup.Item
                                key={idx}
                                style={{
                                    height: "3rem",
                                    width: "fit-content",
                                    minWidth: "5rem",
                                    maxWidth: "20rem",
                                    flexShrink: "0",
                                    overflow: "scroll",
                                    textOverflow: "ellipsis"
                                }}>
                                {val}
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </div>
        </div>
    </>);
};

export default Page;
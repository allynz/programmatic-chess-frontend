import { useEffect, useState } from 'react';
import { eq } from '../../utilities/equals';

const ChildComponent = ({ onChildStateChange, parentState }: any) => {
    const [childState, setChildState] = useState(1);
    console.log("rendered");
    if (eq(parentState, '')) {
        console.log("yuhuu");
    }

    useEffect(() => {
        // Call the onChildStateChange callback whenever childState changes
        onChildStateChange(childState);
    }, [childState]);

    // ... rest of the component ...

    return (
        <div>
            <p>Child State: {childState}</p>
            <button onClick={() => setChildState(childState + 1)}>Update State</button>
        </div>
    );
};

const ParentComponent = () => {
    const [parentState, setParentState] = useState('');

    // Update the parent state when the child state changes
    const handleChildStateChange = (newChildState: any) => {
        setParentState(newChildState);
    };

    // Listen for changes in the parent state
    useEffect(() => {
        console.log('Parent state changed:', parentState);
    }, [parentState]);

    const Comp = () => {
        const render: boolean = eq(parentState, '');
        if (render) {
            return (
                <div>
                    <p>Parent State: {parentState}</p>
                    <ChildComponent
                        parentState={parentState}
                        onChildStateChange={handleChildStateChange} />
                </div>
            );
        } else {
            console.log("here");
            return (
                <div>
                    <p>Parent State: {parentState}</p>
                    <ChildComponent
                        parentState={parentState}
                        onChildStateChange={handleChildStateChange} />
                </div>
            );
        }
    }

    return (<Comp />);

};

export default ParentComponent;

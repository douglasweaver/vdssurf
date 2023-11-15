import { useState, useEffect } from 'react';

// When useOnScreen runs the first time it will set up the observer callback
// and the state variable “isIntersecting” and return that.
// If the ref changes, the useEffect in useOnScreen will 
// trigger and the observer will be reset
// Otherwise the observer is just waiting till the ref is on screen (which is 
// something the browser can detect with the IntersectionObserver API) and when 
// it does it updates the “isIntersecting” state variable through the “setIntersecting”
// callback.  This triggers the hook to re-render, which will trigger whatever 
// component it’s used in to rerender


export default function useOnScreen(
    ref,
    defaultValue = false,
) {
    const [isIntersecting, setIntersecting] = useState(defaultValue);

    const observer =
        !!ref &&
        new IntersectionObserver(([entry]) => {
            console.log("setting intersecting",entry.isIntersecting)
            setIntersecting(entry.isIntersecting)
        });


    useEffect(() => {
        if (!ref || !ref?.current) return;
        observer.observe(ref.current);
        return () => {
            observer.disconnect();
        };
    }, [ref]);

    return isIntersecting;
}

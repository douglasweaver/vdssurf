import { useState, useEffect, useRef } from 'react';

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
    const observerRef = useRef(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(([entry]) =>
            setIntersecting(entry.isIntersecting)
        );
    }, []);

    useEffect(() => {
        observerRef.current.observe(ref.current);

        return () => {
            observerRef.current.disconnect();
        };
    }, [ref]);

    return isIntersecting

}

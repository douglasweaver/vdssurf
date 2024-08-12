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

export default function useTopBottomIntersection({
    topRef,
    bottomRef,
    root = null,
}) {
    const [refs, setRefs] = useState({ top: topRef, bottom: bottomRef });
    const [isIntersecting, setIntersecting] = useState({ top: false, bottom: false });
    const observerRef = useRef(null);

    let options = {
        root: root,
        rootMargin: "0px",
        threshold: 1.0,
    };


    useEffect(() => {
        console.log("red",topRef, bottomRef)
        topRef.current && observerRef.current.observe(topRef.current);
        bottomRef.current && observerRef.current.observe(bottomRef.current);

        return () => {
            observerRef.current.disconnect();
        };
    }, []);



    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            setIntersecting({
                top: (entries.find((e) => e.target === refs.top.current)?.isIntersecting ?? false),
                bottom: (entries.find((e) => e.target === refs.bottom.current)?.isIntersecting ?? false)
            })
        },
            options
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log("GGGGGGFG",topRef, bottomRef)
        observerRef.current.disconnect();
        topRef.current && observerRef.current.observe(topRef.current);
        bottomRef.current && observerRef.current.observe(bottomRef.current);
        setRefs({ top: topRef, bottom: bottomRef })
    }, [topRef, bottomRef]);

    return isIntersecting

}

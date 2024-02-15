import { useState, useEffect, forwardRef } from 'react'
import '../App.css'


const Fader = forwardRef(function Fader(props, ref) {

    const { text, Size, inDelay, outDelay } = props;

    const [fadeProp, setFadeProp] = useState({
        fade: 'fade-in',
    });

    useEffect(() => {
        const timeout = setInterval(() => {
            if (fadeProp.fade === 'fade-in') {
                setFadeProp({
                    fade: 'fade-out'
                })
            } else {
                setFadeProp({
                    fade: 'fade-in'
                })
            }
        }, (fadeProp.fade === 'fade-in') ? inDelay: outDelay);

        return () => clearInterval(timeout)
    }, [fadeProp, inDelay, outDelay])

    return (

        <div
            style={{
                position: "sticky",
                top: 0,
            }}
            ref={ref}
        >
            <Size
                className={fadeProp.fade}
                style={{
                    whiteSpace: 'nowrap',
                    position: "absolute",
                    top: "-16px",
                    overflowX: "visible",
                    background: "white",
                    height: '24px',
                    fontWeight: 'bold',
                    paddingRight: '5px',
                    // ...styles
                }}
            >
                {text}
            </Size>
        </div>
    )
})

export default Fader
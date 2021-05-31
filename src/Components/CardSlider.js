import React, { useRef } from 'react';
import { ArrowLeftCircle, ArrowRightCircle } from 'react-feather';
import TCARD from './TittleCard';

export default function CardSlider({ tittles }) {
    const slide = useRef();
    return (
        <div className="card-slider" >
            {/* Two Buttons */}
            <button onClick={() => slide.current.scrollBy({ left: slide.current.clientWidth, behavior: "smooth" })} style={{ right: '10px' }} className="move-slides slide-right"> <ArrowRightCircle fill="white" color="red" size="30" /> </button>
            <button onClick={() => slide.current.scrollBy({ left: -slide.current.clientWidth, behavior: "smooth" })} style={{ left: '10px' }} className="move-slides slide-left"> <ArrowLeftCircle fill="white" color="red" size="30" /> </button>
            <div ref={slide} className="slides-container">
                {tittles.map((title, index) => <TCARD key={index} title={title} />)}
            </div>
        </div>
    )
}

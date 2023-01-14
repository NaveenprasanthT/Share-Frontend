import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import ad from "../.././../assest/ad.png";

import "./Add.css"





const slideImages = [
    {
      url:ad,
    },
    {
      url:ad,
    },
    {
      url:ad,
    },
  ];

function Add() {
    return ( 
        <div className="Add">
            <div>
              <span>Ad Space</span>
             <Slide>
                {slideImages.map((slideImage)=> (
                <div className="each-slide">
                    <img src={slideImage.url} alt="" />
            </div>
          ))} 
        </Slide>
        </div>
        </div>
     );
}

export default Add;
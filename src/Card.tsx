import React from "react";
import './index.css';

interface ImgProps{
  img: string
}
 

const Card = ({ img }:ImgProps ) => {
  return (
    <>
    <div className="card">
      <img alt={img} src={img}></img>
      </div>
    
    </>
  )
}


export default Card;
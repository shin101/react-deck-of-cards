import React from "react";
import './index.css';


const Card = ({ img }) => {
  return (
    <div className="card"><img alt={img} src={img}></img></div>
  )
}


export default Card;
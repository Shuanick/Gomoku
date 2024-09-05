import React from "react";

function TR({row,col,color,cellClick,isWinningCell}) {
    const handlerClick = () => {
        cellClick(row,col);
    };


    return (
        <div onClick={handlerClick} className={`cell-container ${isWinningCell ? 'blinking' : ''}`}>
            <img 
                className="cell-image" 
                src={color === 0 ? "/images/top-right.png" : color === 1 ? "/images/black-top-right.png" : "/images/white-top-right.png"} 
            />
        </div>
    );
}


export default TR;
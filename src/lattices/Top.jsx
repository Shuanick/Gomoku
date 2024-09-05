import React from "react";

function Top({row,col,color,cellClick,isWinningCell}) {
    const handlerClick = () => {
        cellClick(row,col);
    };


    return (
        <div onClick={handlerClick} className={`cell-container ${isWinningCell ? 'blinking' : ''}`}>
            <img 
                className="cell-image" 
                src={color === 0 ? "/images/top.png" : color === 1 ? "/images/black-top.png" : "/images/white-top.png"} 
            />
        </div>
    );
}


export default Top;
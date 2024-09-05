import React from "react";

function TL({row,col,color,cellClick,isWinningCell}) {
    const handlerClick = () => {
        cellClick(row,col);
    };


    return (
        <div onClick={handlerClick} className={`cell-container ${isWinningCell ? 'blinking' : ''}`}>
            <img 
                className="cell-image" 
                src={color === 0 ? "/images/top-left.png" : color === 1 ? "/images/black-top-left.png" : "/images/white-top-left.png"} 
            />
        </div>
    );
}


export default TL;
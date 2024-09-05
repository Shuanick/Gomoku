import React from "react";

function BL({row,col,color,cellClick,isWinningCell}) {
    const handlerClick = () => {
        cellClick(row,col);
    };


    return (
        <div onClick={handlerClick} className={`cell-container ${isWinningCell ? 'blinking' : ''}`}>
            <img 
                className="cell-image" 
                src={color === 0 ? "/images/bottom-left.png" : color === 1 ? "/images/black-bottom-left.png" : "/images/white-bottom-left.png"} 
            />
        </div>
    );
}


export default BL;
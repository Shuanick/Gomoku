import React from "react";

function Left({row,col,color,cellClick,isWinningCell}) {
    const handlerClick = () => {
        cellClick(row,col);
    };


    return (
        <div onClick={handlerClick} className={`cell-container ${isWinningCell ? 'blinking' : ''}`}>
            <img 
                className="cell-image" 
                src={color === 0 ? "/images/left.png" : color === 1 ? "/images/black-left.png" : "/images/white-left.png"} 
            />
        </div>
    );
}
export default Left;
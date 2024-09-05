import React from "react";

function BR({row,col,color,cellClick,isWinningCell}) {
    const handlerClick = () => {
        cellClick(row,col);
    };


    return (
        <div onClick={handlerClick} className={`cell-container ${isWinningCell ? 'blinking' : ''}`}>
            <img 
                className="cell-image" 
                src={color === 0 ? "/images/bottom-right.png" : color === 1 ? "/images/black-bottom-right.png" : "/images/white-bottom-right.png"} 
            />
        </div>
    );
}


export default BR;
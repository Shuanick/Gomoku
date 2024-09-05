import React from "react";

function Cell({row,col,color,cellClick,isWinningCell}) {
    const handlerClick = () => {
        cellClick(row,col);
    };


    return (
        <div onClick={handlerClick} className={`cell-container ${isWinningCell ? 'blinking' : ''}`}>
            <img 
                className="cell-image" 
                src={color === 0 ? "/images/cell.png" : color === 1 ? "/images/black.png" : "/images/white.png"} 
            />
        </div>
    );
}


export default Cell;
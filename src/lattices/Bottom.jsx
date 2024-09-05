import React from "react";

function Bottom({row,col,color,cellClick,isWinningCell}) {
    const handlerClick = () => {
        cellClick(row,col);
    };


    return (
        <div onClick={handlerClick} className={`cell-container ${isWinningCell ? 'blinking' : ''}`}>
            <img 
                className="cell-image" 
                src={color === 0 ? "/images/bottom.png" : color === 1 ? "/images/black-bottom.png" : "/images/white-bottom.png"} 
            />
        </div>
    );
}


export default Bottom;
import React from "react";

function Right({row,col,color,cellClick,isWinningCell}) {
    const handlerClick = () => {
        cellClick(row,col);
    };


    return (
        <div onClick={handlerClick} className={`cell-container ${isWinningCell ? 'blinking' : ''}`}>
            <img 
                className="cell-image" 
                src={color === 0 ? "/images/right.png" : color === 1 ? "/images/black-right.png" : "/images/white-right.png"} 
            />
        </div>
    );
}


export default Right;
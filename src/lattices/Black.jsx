import { useState } from "react";

function Black({turn,nextHand}){
    const [piece,setPiece] = useState(0);
    
    return (
    <div className="cell-container">
        <img className="cell-image" src="/images/black.png"/>
    </div>
    )
}
export default Cell;
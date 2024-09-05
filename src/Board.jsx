  import { useState, useEffect } from "react";
  import "./gomuku.css";
  import Cell from "./lattices/Cell.jsx";
  import TL from "./lattices/Tl.jsx";
  import Top from "./lattices/Top.jsx";
  import TR from "./lattices/Tr.jsx";
  import Left from "./lattices/Left.jsx";
  import Right from "./lattices/Right.jsx";
  import BL from "./lattices/Bl.jsx";
  import BR from "./lattices/Br.jsx";
  import Bottom from "./lattices/Bottom.jsx";

  function Board({sendMove,move,socket}) {
    const [turn, setTurn] = useState(0);
    const [board, setBoard] = useState(
      Array(15).fill(null).map(() => Array(15).fill(0))
    );
    const [winner, setWinner] = useState(null);
    const [winCell, setWinCell] = useState([]);

    useEffect(() => {
      if (move) {
        const { row, col, color } = move;
        const newBoard = board.map((row) => [...row]);
        newBoard[row][col] = color;
        setBoard(newBoard);

        if (checkWin(row, col, color)) {
          setWinner(color);
        } else {
          if (turn % 2 === (color - 1)) {
            nextHand();
          }
        }
      }
    }, [move]);

    const nextHand = () => {
      setTurn(turn => turn + 1);
    };

    const checkWin = (row, col, color) => {
      const directions = [
        { row: 0, col: 1 },
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 1, col: -1 },
      ];

      for (const { row: rowDir, col: colDir } of directions) {
        let count = 1;
        const winCell = [{ row, col }];

        for (let i = 1; i < 5; i++) {
          const r = row + i * rowDir;
          const c = col + i * colDir;
          if (r < 0 || r >= 15 || c < 0 || c >= 15 || board[r][c] !== color)
            break;
          count++;
          winCell.push({ row: r, col: c });
        }

        for (let i = 1; i < 5; i++) {
          const r = row - i * rowDir;
          const c = col - i * colDir;
          if (r < 0 || r >= 15 || c < 0 || c >= 15 || board[r][c] !== color)
            break;
          count++;
          winCell.push({ row: r, col: c });
        }

        if (count >= 5) {
          setWinCell(winCell);
          return true;
        }
      }

      return false;
    };

    const cellClick = (row, col) => {
      if (board[row][col] !== 0 || winner) return;

      const color = turn % 2 === 0 ? 1 : 2;
      const newBoard = board.map((row) => [...row]);
      newBoard[row][col] = color;
      setBoard(newBoard);

      if (checkWin(row, col, color)) {
        setWinner(color);
      } else {
        nextHand();
      }
      if (sendMove) {
        sendMove({ row, col, color });
      }
    };

    const generateBoard = () => {
      const rows = 15;
      const cols = 15;

      return Array.from({ length: rows * cols }, (_, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const isWinningCell = winCell.some(cell => cell.row === row && cell.col === col);

        if (row === 0 && col === 0)
          return (
            <TL
              key={index}
              row={row}
              col={col}
              color={board[row][col]}
              cellClick={cellClick}
              isWinningCell={isWinningCell}
            />
          );
        else if (row === 0 && col === cols - 1)
          return (
            <TR
              key={index}
              row={row}
              col={col}
              color={board[row][col]}
              cellClick={cellClick}
              isWinningCell={isWinningCell}
            />
          );
        else if (row === rows - 1 && col === 0)
          return (
            <BL
              key={index}
              row={row}
              col={col}
              color={board[row][col]}
              cellClick={cellClick}
              isWinningCell={isWinningCell}
            />
          );
        else if (row === rows - 1 && col === cols - 1)
          return (
            <BR
              key={index}
              row={row}
              col={col}
              color={board[row][col]}
              cellClick={cellClick}
              isWinningCell={isWinningCell}
            />
          );
        else if (row === 0)
          return (
            <Top
              key={index}
              row={row}
              col={col}
              color={board[row][col]}
              cellClick={cellClick}
              isWinningCell={isWinningCell}
            />
          );
        else if (row === rows - 1)
          return (
            <Bottom
              key={index}
              row={row}
              col={col}
              color={board[row][col]}
              cellClick={cellClick}
              isWinningCell={isWinningCell}
            />
          );
        else if (col === 0)
          return (
            <Left
              key={index}
              row={row}
              col={col}
              color={board[row][col]}
              cellClick={cellClick}
              isWinningCell={isWinningCell}
            />
          );
        else if (col === cols - 1)
          return (
            <Right
              key={index}
              row={row}
              col={col}
              color={board[row][col]}
              cellClick={cellClick}
              isWinningCell={isWinningCell}
            />
          );
        else
          return (
            <Cell
              key={index}
              row={row}
              col={col}
              color={board[row][col]}
              cellClick={cellClick}
              isWinningCell={isWinningCell}
            />
          );
      });
    };

    const restart = () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'reset' }));
      }
    };

    useEffect(() => {
      if (winner !== null) {
        const timer = setTimeout(() => {
          alert(winner === 1 ? "黑棋胜利" : "白棋胜利");
        }, 100);
        return () => clearTimeout(timer);
      }
    }, [winner]);

    return (
      <div className="board-container">
        <div className="board">{generateBoard()}</div>
        <div className="turn-info">
          <div style={{ fontWeight: "bold" }}>回合数 : {turn}</div>
          <div style={{ marginLeft: "150px", marginRight: "150px", fontWeight: "bold" }}>
            {turn % 2 ? "白棋回合" : "黑棋回合"}
          </div>
          <button className="reset-button" onClick={restart}>
            重新开始
          </button>
        </div>
      </div>
    );
  }

  export default Board;

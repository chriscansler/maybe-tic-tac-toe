import { useState } from "react";

function Square({ value, onSquareClick }) {
    return (
        <div className="square" onClick={onSquareClick}>{value}</div>
    );
}

function CheckForWinner(squares) {
    let isWinner = false;
    let list = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 8]
    ];

    for (let i = 0; i < list.length; i++) {
        let [a, b, c] = list[i];
        if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
            isWinner = true;
        }
    }

    return isWinner;
}

export default function Game() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [status, setStatus] = useState("");

    function handleReset() {
        setXIsNext(true);
        let nextSquares = Array(9).fill(null);
        setSquares(nextSquares);
    }

    return (
        <>
            <div className="status">
                <button onClick={handleReset}>Reset</button>
                <span>{status}</span>
            </div>
            <Board squares={squares} xIsNext={xIsNext}/>
        </>
    );
}

function Board() {
    

    const winner = CheckForWinner(squares);

    function handleOnClick(i) {
        if (!winner && squares[i] == null) {
            let nextSquares = squares.slice();
            nextSquares[i] = xIsNext ? "X" : "O";
            setSquares(nextSquares);
            setXIsNext(!xIsNext);
        }
    }

    return (
        <>
            
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleOnClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleOnClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleOnClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleOnClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleOnClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleOnClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleOnClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleOnClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleOnClick(8)} />
            </div>
        </>
    );
}
import { useState } from "react";

function Square({ value, onSquareClick }) {
    return (
        <div className="square" onClick={onSquareClick}>{value}</div>
    );
}

function calculateWinner(squares) {
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
            return squares[a];
        }
    }

    return null;
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [xIsNext, setXIsNext] = useState(true);

    const currentSquares = history[history.length - 1];

    const gameHistory = history.map((squares, index) => {
        let description;

        if (index == 0) {
            description = "Go to game start";
        } else {
            description = `Go to move #${index}`;
        }
        return (
            <li class="game-history-item"><button onClick={() => jumpTo(index)}>{description}</button></li>
        );
    });

    function jumpTo(index) {
        // TODO
    }

    function handleReset() {
        setXIsNext(true);
        let newHistory = [Array(9).fill(null)];
        setHistory(newHistory);
    }

    function handlePlay(nextSquares) {
        setHistory([...history, nextSquares]);
        setXIsNext(!xIsNext);
    }

    function GameHistory() {
        return (
            <>
                <ol>{gameHistory}</ol>
            </>
        );
    }

    return (
        <>
            <div className="game-board">
                <Board squares={currentSquares} xIsNext={xIsNext} onPlay={handlePlay} onReset={handleReset} />
                <div className="game-history">
                    <span className="game-history--title">Move History:</span>
                    <GameHistory />
                </div>
            </div>
        </>
    );
}

function Board({ squares, xIsNext, onPlay, onReset }) {

    function handleOnClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        let nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? "X" : "O";
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next player: ${xIsNext ? "X" : "O"} `;
    }

    return (
        <>
            <div>
                <div className="status">
                    <button onClick={onReset}>Reset</button>
                    <span>{status}</span>
                </div>
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
            </div>
        </>
    );
}
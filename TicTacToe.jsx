import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const TicTacToe = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const titleRef = useRef(null);
    const [data, setData] = useState(Array(9).fill(""));

    const toggle = (num) => {
        if (lock || data[num] !== "") {
            return;
        }
        const newData = [...data];
        newData[num] = count % 2 === 0 ? "x" : "o";
        setData(newData);
        setCount(count + 1);
        checkWin(newData);
    };

    const checkWin = (currentData) => {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
            [0, 4, 8], [2, 4, 6] // Diagonal
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (currentData[a] && currentData[a] === currentData[b] && currentData[b] === currentData[c]) {
                won(currentData[a]);
                return;
            }
        }

        // Check for tie
        if (count === 9) {
            titleRef.current.innerHTML = "It's a tie!";
            setLock(true);
        }
    };

    const resetGame = () => {
        setData(Array(9).fill(""));
        setCount(0);
        setLock(false);
        titleRef.current.innerHTML = "Tic Tac Toe Game In <span>React</span>";
    };

    const won = (winner) => {
        setLock(true);
        if (winner === "x") {
            titleRef.current.innerHTML = `Congratulations: X won!`;
        } else {
            titleRef.current.innerHTML = `Congratulations: O won!`;
        }
    };

    return (
        <div className='container'>
            <h1 className="title" ref={titleRef}>Tic Tac Toe Game In <span>React</span></h1>
            <div className="board">
                <div className="row1">
                    {data.slice(0, 3).map((value, index) => (
                        <div key={index} className="boxes" onClick={() => toggle(index)}>
                            {value === "x" && <img src={cross_icon} alt="cross" />}
                            {value === "o" && <img src={circle_icon} alt="circle" />}
                        </div>
                    ))}
                </div>
                <div className="row2">
                    {data.slice(3, 6).map((value, index) => (
                        <div key={index + 3} className="boxes" onClick={() => toggle(index + 3)}>
                            {value === "x" && <img src={cross_icon} alt="cross" />}
                            {value === "o" && <img src={circle_icon} alt="circle" />}
                        </div>
                    ))}
                </div>
                <div className="row3">
                    {data.slice(6).map((value, index) => (
                        <div key={index + 6} className="boxes" onClick={() => toggle(index + 6)}>
                            {value === "x" && <img src={cross_icon} alt="cross" />}
                            {value === "o" && <img src={circle_icon} alt="circle" />}
                        </div>
                    ))}
                </div>
            </div>
            <button className="reset" onClick={resetGame}>Reset</button>
        </div>
    );
};

export default TicTacToe;

import React, { useRef, useState } from 'react';
import './TicTacToeStyle.css';

function TicTacToe() {

    
    const wincondition = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8]
    ];

    const initialBoxes = () => Array(9).fill(null);

    const [box, setBox] = useState(initialBoxes());
    const [isPlaying, setIsPlaying] = useState(true);
    const [playerState, setPlayerState] = useState('X');
    const PlayerTitle = useRef(null);
    const [showWinner, setShowWinner] = useState('');
    const [showResult , setShowResult] = useState('')

    function startGame(index) {
        if (!isPlaying || box[index]) return;
        const newbox = [...box];
        newbox[index] = playerState;
        setBox(newbox);
        PlayerTitle.current.textContent = `${playerState}'s turn!`;
        checkWinner(newbox);
    }

    function PlayerChangeState() {
        setPlayerState((prev) => (prev === 'X' ? 'O' : 'X'));
        PlayerTitle.current.textContent = `${playerState === 'X' ? 'O' : 'X'}'s turn!`;
    }

    function checkWinner(newbox) {
        let roundWon = false;

        for (let i = 0; i < wincondition.length; i++) {
            const [A, B, C] = wincondition[i];

            if (newbox[A] && newbox[A] === newbox[B] && newbox[B] === newbox[C]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            setIsPlaying(false);
            setShowWinner('done');
            setShowResult(`${playerState}   is the winner🎉`)
        } else if (!newbox.includes(null)) {
            setIsPlaying(false);
            setShowWinner('done');
            setShowResult(`It's a draw`)
        } else {
            PlayerChangeState();
        }
    }

    function restartGame() {
        setBox(initialBoxes());
        setPlayerState('X');
        PlayerTitle.current.textContent = `X's turn!`;
        setIsPlaying(true);
        setShowWinner('');
        setShowResult('')
    }



    

    return (
        <div className='container'>
            {showWinner === 'done' ? (
                <div className='showWinner'>
                    <div className="showWinner-container">
                      <h2>{showResult}</h2>
                      <button onClick={restartGame}>Play Again</button>
                    </div>
                </div>
            ) : null}

            <h1 className='game-title'>Tic Tac Toe</h1>
            <div className='game-boxes'>
                {box.map((value, index) => {
                    return (
                        <div className='box' key={index} onClick={() => startGame(index)} boxindex={index}>
                            <span>{value}</span>
                        </div>
                    );
                })}

            </div>
  
            <h2 className='winnertxt' ref={PlayerTitle}>X's turn!</h2>
            <button className='restart-btn' onClick={restartGame}>Restart</button>
        </div>
    );
}

export default TicTacToe;
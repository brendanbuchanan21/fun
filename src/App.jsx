import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // Remove unused count state
  // const [count, setCount] = useState(0)

  // Board state: 9 squares, null means empty
  const [board, setBoard] = useState(Array(9).fill(null));
  // true: X's turn, false: O's turn
  const [isXNext, setIsXNext] = useState(true);

  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
  const [draws, setDraws] = useState(0);

  // Handle click on a square
  const handleSquareClick = (index) => {
    if (board[index]) return; // Ignore if already filled
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  // calculate winner logic 
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5],
      [6, 7, 8], [0, 3, 6],
      [1, 4, 7], [2, 5, 8],  
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // Return 'X' or 'O' as the winner
      }
    }
    return null; // No winner yet
  };


  return (
    
    <section className='flex h-screen w-screen border-4 border-blue-500 flex-col pt-6 items-center'>
      <div className='flex w-2xl h-40 border-3 border-green-600 justify-center items-center'>
        <h1 className='text-3xl'>Tic Tac Toe fun</h1>
      </div>
      <div className='border-8 border-blue-500 flex flex-row w-full align-center justify-center'>
         <div className='border-8 border-red-500 w-1/4' >
            <p>Player 1: X</p>
         </div>
         <div className='border border-red-300 w-1/2 flex flex-col items-center'>
            <div className='border-2 border-purple-500 w-1/2 h-1/4 flex items-center justify-center mt-3'>
            <h2>Player 1, pick a square to begin</h2>
            </div>
          { /* Tic Tac Toe board */}
          <div className='grid grid-cols-3 mt-6'>
            {board.map((square, index) => (
              <div
                key={index}
                className='border border-gray-300 w-20 h-20 flex items-center justify-center cursor-pointer hover:bg-gray-100 text-2xl font-bold'
                onClick={() => {
                    handleSquareClick(index);
                    if (calculateWinner(board)) {
                      alert(`Player ${isXNext ? 'X' : 'O'} wins!`);
                      setBoard(Array(9).fill(null)); // Reset board
                      setIsXNext(true); // Reset to Player X's turn
                      if (isXNext) {
                        setPlayer1Wins(player1Wins + 1);
                      } else if (!isXNext) {
                        setPlayer2Wins(player2Wins + 1);
                      } else {
                        setDraws(draws + 1);
                      }
                    }
                }}
              >
                {square}
              </div>
            ))}
          </div>
        </div>
          <div className='border-8 border-red-500 w-1/4'>
            <p>Player 2: O</p>
          </div>
      </div>
          
      {/* Placeholder for additional content, such as game instructions or player info */}
          <div className='border-4 border-purple-500 w-full h-20'>

          </div>
       {/* scoreboard and game status */}     
      <div className='border-8 border-blue-500 w-full h-80 flex flex-col items-center mt-6'>
        <h2 className='text-xl'>Scoreboard</h2>
        <p>Player 1 Wins: {player1Wins}</p>
        <p>Player 2 Wins: {player2Wins}</p>
        <p>Draws: {draws}</p>
      </div>
    </section>
      
    
  )
}

export default App

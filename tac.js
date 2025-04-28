//Cool Tic Tac Toe Game that SUPER EASY TO CODE!!!

// Tic-Tac-Toe Console Game

// Initialize the game board as a 3x3 grid with empty spaces
const createBoard = () => {
    return [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ];
  };
  
  // Display the current state of the board
  const displayBoard = (board) => {
    console.clear(); // Clear the console for a cleaner display
    console.log('Tic-Tac-Toe\n');
    console.log(' 1 2 3');
    for (let i = 0; i < 3; i++) {
      let row = (i + 1) + ' ';
      for (let j = 0; j < 3; j++) {
        row += board[i][j];
        if (j < 2) row += '|';
      }
      console.log(row);
      if (i < 2) console.log('  -+-+-');
    }
    console.log('');
  };
  
  // Check if a player has won
  const checkWin = (board, player) => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
        return true;
      }
    }
    
    // Check columns
    for (let j = 0; j < 3; j++) {
      if (board[0][j] === player && board[1][j] === player && board[2][j] === player) {
        return true;
      }
    }
    
    // Check diagonals
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
      return true;
    }
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
      return true;
    }
    
    return false;
  };
  
  // Check if the board is full (draw)
  const isBoardFull = (board) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === ' ') {
          return false;
        }
      }
    }
    return true;
  };
  
  // Get player move with validation
  const getPlayerMove = () => {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    return new Promise((resolve) => {
      rl.question('Enter your move (row column): ', (answer) => {
        rl.close();
        const [row, col] = answer.split(' ').map(num => parseInt(num.trim(), 10) - 1);
        resolve({ row, col });
      });
    });
  };
  
  // Simple AI for computer player (random legal move)
  const getComputerMove = (board) => {
    const availableMoves = [];
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === ' ') {
          availableMoves.push({ row: i, col: j });
        }
      }
    }
    
    // Choose a random available move
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
  };
  
  // Main game function
  const playGame = async () => {
    let board = createBoard();
    let currentPlayer = 'X'; // Player is X, Computer is O
    let gameOver = false;
    
    console.log('Welcome to Tic-Tac-Toe!');
    console.log('You are X, the computer is O.');
    console.log('Enter your moves as "row column" (e.g., "1 3" for top-right)\n');
    
    while (!gameOver) {
      displayBoard(board);
      
      let move;
      let validMove = false;
      
      // Player's turn
      if (currentPlayer === 'X') {
        console.log("Your turn (X):");
        
        while (!validMove) {
          move = await getPlayerMove();
          
          // Check if the move is valid
          if (move.row >= 0 && move.row < 3 && move.col >= 0 && move.col < 3 && board[move.row][move.col] === ' ') {
            validMove = true;
          } else {
            console.log("Invalid move. Try again.");
          }
        }
      } 
      // Computer's turn
      else {
        console.log("Computer's turn (O):");
        move = getComputerMove(board);
        
        // Small delay to make it feel like the computer is "thinking"
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // Make the move
      board[move.row][move.col] = currentPlayer;
      
      // Check for win
      if (checkWin(board, currentPlayer)) {
        displayBoard(board);
        if (currentPlayer === 'X') {
          console.log("Congratulations! You win!");
        } else {
          console.log("Computer wins! Better luck next time.");
        }
        gameOver = true;
      } 
      // Check for draw
      else if (isBoardFull(board)) {
        displayBoard(board);
        console.log("It's a draw!");
        gameOver = true;
      } 
      // Switch player
      else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
    
    // Ask to play again
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.question('Play again? (y/n): ', (answer) => {
      rl.close();
      if (answer.toLowerCase() === 'y') {
        playGame();
      } else {
        console.log('Thanks for playing!');
      }
    });
  };
  
  // Start the game
  playGame();
  
  
  
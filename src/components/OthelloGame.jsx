import React, { useState, useEffect, useCallback } from 'react';
import { 
  RotateCcw, 
  Trophy, 
  Circle, 
  User, 
  Lightbulb,
  Home,
  Play,
  Bot,
  Settings,
  Users,
  Brain,
  Clock
} from 'lucide-react';

const OthelloGame = () => {
  // ゲーム状態
  const [board, setBoard] = useState(() => initializeBoard());
  const [currentPlayer, setCurrentPlayer] = useState(1); // 1: 黒, 2: 白
  const [gameStatus, setGameStatus] = useState('menu'); // 'menu', 'playing', 'finished'
  const [scores, setScores] = useState({ black: 2, white: 2 });
  const [validMoves, setValidMoves] = useState([]);
  const [showHints, setShowHints] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  
  // AI対戦関連
  const [gameMode, setGameMode] = useState('pvp'); // 'pvp', 'pvc'
  const [aiDifficulty, setAiDifficulty] = useState('normal'); // 'easy', 'normal', 'hard'
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [aiPlayer, setAiPlayer] = useState(2); // AIが白(2)を担当

  // 初期ボードの設定
  function initializeBoard() {
    const board = Array(8).fill(null).map(() => Array(8).fill(0));
    // 初期配置
    board[3][3] = 2; // 白
    board[3][4] = 1; // 黒
    board[4][3] = 1; // 黒
    board[4][4] = 2; // 白
    return board;
  }

  // 8方向のベクトル
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];

  // 指定した方向に石をひっくり返せるかチェック
  const checkDirection = useCallback((board, row, col, player, dRow, dCol) => {
    const opponent = player === 1 ? 2 : 1;
    let r = row + dRow;
    let c = col + dCol;
    let hasOpponent = false;

    while (r >= 0 && r < 8 && c >= 0 && c < 8) {
      if (board[r][c] === 0) {
        return 0; // 空のマスに到達
      }
      if (board[r][c] === opponent) {
        hasOpponent = true;
      } else if (board[r][c] === player) {
        return hasOpponent ? 1 : 0; // 自分の石に到達
      }
      r += dRow;
      c += dCol;
    }
    return 0; // ボードの境界に到達
  }, []);

  // 合法手かどうかチェック
  const isValidMove = useCallback((board, row, col, player) => {
    if (board[row][col] !== 0) return false;

    for (const [dRow, dCol] of directions) {
      if (checkDirection(board, row, col, player, dRow, dCol)) {
        return true;
      }
    }
    return false;
  }, [checkDirection, directions]);

  // 合法手のリストを取得
  const getValidMoves = useCallback((board, player) => {
    const moves = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (isValidMove(board, row, col, player)) {
          moves.push([row, col]);
        }
      }
    }
    return moves;
  }, [isValidMove]);

  // 石をひっくり返す
  const flipStones = useCallback((board, row, col, player) => {
    const newBoard = board.map(row => [...row]);
    newBoard[row][col] = player;

    for (const [dRow, dCol] of directions) {
      if (checkDirection(board, row, col, player, dRow, dCol)) {
        let r = row + dRow;
        let c = col + dCol;
        
        while (r >= 0 && r < 8 && c >= 0 && c < 8 && newBoard[r][c] !== player) {
          newBoard[r][c] = player;
          r += dRow;
          c += dCol;
        }
      }
    }
    return newBoard;
  }, [checkDirection, directions]);

  // スコアを計算
  const calculateScores = useCallback((board) => {
    let black = 0;
    let white = 0;
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (board[row][col] === 1) black++;
        else if (board[row][col] === 2) white++;
      }
    }
    
    return { black, white };
  }, []);

  // ゲーム終了チェック
  const checkGameEnd = useCallback((board, player) => {
    const currentPlayerMoves = getValidMoves(board, player);
    const opponentMoves = getValidMoves(board, player === 1 ? 2 : 1);
    
    return currentPlayerMoves.length === 0 && opponentMoves.length === 0;
  }, [getValidMoves]);

  // マスをクリックした時の処理
  const handleCellClick = (row, col) => {
    if (gameStatus !== 'playing' || !isValidMove(board, row, col, currentPlayer)) {
      return;
    }

    // AI対戦時は人間のターンでのみクリックを受け付ける
    if (gameMode === 'pvc' && currentPlayer === aiPlayer) {
      return;
    }

    const newBoard = flipStones(board, row, col, currentPlayer);
    const newScores = calculateScores(newBoard);
    
    // ゲーム履歴に追加
    setGameHistory(prev => [...prev, { board: [...board], player: currentPlayer, move: [row, col] }]);
    
    setBoard(newBoard);
    setScores(newScores);

    // 次のプレイヤーに交代
    const nextPlayer = currentPlayer === 1 ? 2 : 1;
    const nextPlayerMoves = getValidMoves(newBoard, nextPlayer);
    
    if (nextPlayerMoves.length > 0) {
      setCurrentPlayer(nextPlayer);
    } else {
      // 次のプレイヤーが打てない場合、現在のプレイヤーが続行
      const currentPlayerMoves = getValidMoves(newBoard, currentPlayer);
      if (currentPlayerMoves.length === 0) {
        // ゲーム終了
        setGameStatus('finished');
        const winner = newScores.black > newScores.white ? 'black' : 
                      newScores.white > newScores.black ? 'white' : 'draw';
        setWinner(winner);
      }
    }
  };

  // ゲームリセット
  const resetGame = () => {
    setBoard(initializeBoard());
    setCurrentPlayer(1);
    setGameStatus('playing');
    setScores({ black: 2, white: 2 });
    setWinner(null);
    setGameHistory([]);
    setIsAiThinking(false);
  };

  // ゲーム開始
  const startGame = (mode, difficulty = 'normal') => {
    setGameMode(mode);
    setAiDifficulty(difficulty);
    setGameStatus('playing');
    resetGame();
  };

  // メニューに戻る
  const backToMenu = () => {
    setGameStatus('menu');
    setIsAiThinking(false);
  };

  // === AI関連の関数 ===

  // 盤面の位置による重み（戦略的評価）
  const getPositionWeight = (row, col) => {
    const weights = [
      [100, -10,  10,   5,   5,  10, -10, 100],
      [-10, -20,  -5,  -5,  -5,  -5, -20, -10],
      [ 10,  -5,   5,   1,   1,   5,  -5,  10],
      [  5,  -5,   1,   1,   1,   1,  -5,   5],
      [  5,  -5,   1,   1,   1,   1,  -5,   5],
      [ 10,  -5,   5,   1,   1,   5,  -5,  10],
      [-10, -20,  -5,  -5,  -5,  -5, -20, -10],
      [100, -10,  10,   5,   5,  10, -10, 100]
    ];
    return weights[row][col];
  };

  // 盤面評価関数
  const evaluateBoard = (board, player) => {
    const opponent = player === 1 ? 2 : 1;
    let score = 0;

    // 石の数による評価
    let playerStones = 0;
    let opponentStones = 0;

    // 位置による重み付け評価
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (board[row][col] === player) {
          playerStones++;
          score += getPositionWeight(row, col);
        } else if (board[row][col] === opponent) {
          opponentStones++;
          score -= getPositionWeight(row, col);
        }
      }
    }

    // モビリティ（合法手の数）による評価
    const playerMoves = getValidMoves(board, player).length;
    const opponentMoves = getValidMoves(board, opponent).length;
    score += (playerMoves - opponentMoves) * 10;

    // 終盤では石の数を重視
    const totalStones = playerStones + opponentStones;
    if (totalStones > 50) {
      score += (playerStones - opponentStones) * 50;
    }

    return score;
  };

  // ミニマックス法
  const minimax = (board, depth, isMaximizing, player, alpha = -Infinity, beta = Infinity) => {
    if (depth === 0) {
      return evaluateBoard(board, aiPlayer);
    }

    const currentPlayer = isMaximizing ? aiPlayer : (aiPlayer === 1 ? 2 : 1);
    const moves = getValidMoves(board, currentPlayer);

    if (moves.length === 0) {
      // パス
      const opponentMoves = getValidMoves(board, isMaximizing ? (aiPlayer === 1 ? 2 : 1) : aiPlayer);
      if (opponentMoves.length === 0) {
        // ゲーム終了
        return evaluateBoard(board, aiPlayer);
      }
      return minimax(board, depth - 1, !isMaximizing, player, alpha, beta);
    }

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (const [row, col] of moves) {
        const newBoard = flipStones(board, row, col, currentPlayer);
        const eval_ = minimax(newBoard, depth - 1, false, player, alpha, beta);
        maxEval = Math.max(maxEval, eval_);
        alpha = Math.max(alpha, eval_);
        if (beta <= alpha) break; // アルファベータ剪定
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const [row, col] of moves) {
        const newBoard = flipStones(board, row, col, currentPlayer);
        const eval_ = minimax(newBoard, depth - 1, true, player, alpha, beta);
        minEval = Math.min(minEval, eval_);
        beta = Math.min(beta, eval_);
        if (beta <= alpha) break; // アルファベータ剪定
      }
      return minEval;
    }
  };

  // AIの手を決定
  const getAiMove = (board, difficulty) => {
    const moves = getValidMoves(board, aiPlayer);
    if (moves.length === 0) return null;

    let bestMove = moves[0];
    let depth;

    switch (difficulty) {
      case 'easy':
        depth = 2;
        break;
      case 'normal':
        depth = 4;
        break;
      case 'hard':
        depth = 6;
        break;
      default:
        depth = 4;
    }

    // 簡単モードではランダム要素を追加
    if (difficulty === 'easy' && Math.random() < 0.3) {
      return moves[Math.floor(Math.random() * moves.length)];
    }

    let bestScore = -Infinity;

    for (const [row, col] of moves) {
      const newBoard = flipStones(board, row, col, aiPlayer);
      const score = minimax(newBoard, depth - 1, false, aiPlayer);
      
      if (score > bestScore) {
        bestScore = score;
        bestMove = [row, col];
      }
    }

    return bestMove;
  };

  // AIの手を実行
  const makeAiMove = async () => {
    if (currentPlayer !== aiPlayer || gameMode !== 'pvc' || isAiThinking) return;

    setIsAiThinking(true);
    
    // AIの思考時間をシミュレート
    const thinkingTime = aiDifficulty === 'easy' ? 500 : 
                        aiDifficulty === 'normal' ? 1000 : 1500;
    
    setTimeout(() => {
      const aiMove = getAiMove(board, aiDifficulty);
      if (aiMove) {
        const [row, col] = aiMove;
        handleCellClick(row, col);
      }
      setIsAiThinking(false);
    }, thinkingTime);
  };

  // ヒント表示切り替え
  const toggleHints = () => {
    setShowHints(!showHints);
  };

  // 合法手の更新
  useEffect(() => {
    if (gameStatus === 'playing') {
      const moves = getValidMoves(board, currentPlayer);
      setValidMoves(moves);
      
      if (checkGameEnd(board, currentPlayer)) {
        setGameStatus('finished');
        const finalScores = calculateScores(board);
        const winner = finalScores.black > finalScores.white ? 'black' : 
                      finalScores.white > finalScores.black ? 'white' : 'draw';
        setWinner(winner);
      }
    }
  }, [board, currentPlayer, gameStatus, getValidMoves, checkGameEnd, calculateScores]);

  // AI自動プレイ
  useEffect(() => {
    if (gameStatus === 'playing' && gameMode === 'pvc' && currentPlayer === aiPlayer && !isAiThinking) {
      makeAiMove();
    }
  }, [gameStatus, gameMode, currentPlayer, aiPlayer, isAiThinking]);

  // セルの内容を取得
  const getCellContent = (row, col) => {
    const cellValue = board[row][col];
    const isValidMoveCell = showHints && validMoves.some(([r, c]) => r === row && c === col);
    
    return (
      <div 
        className={`cell ${isValidMoveCell ? 'valid-move' : ''}`}
        onClick={() => handleCellClick(row, col)}
      >
        {cellValue === 1 && <div className="stone black" />}
        {cellValue === 2 && <div className="stone white" />}
        {isValidMoveCell && <div className="hint-dot" />}
      </div>
    );
  };

  // メニュー画面の描画
  const renderMenu = () => (
    <div className="menu-screen">
      <header className="game-header">
        <h1 className="game-title">
          <Circle className="title-icon" />
          オセロゲーム
        </h1>
        <p className="game-subtitle">
          黒と白の石で相手を挟んでひっくり返そう！
        </p>
      </header>

      <div className="menu-options">
        <div className="mode-section">
          <h2 className="section-title">ゲームモードを選択</h2>
          
          <div className="mode-cards">
            <div className="mode-card" onClick={() => startGame('pvp')}>
              <Users className="mode-icon" />
              <h3>人間 vs 人間</h3>
              <p>友達や家族と対戦しよう</p>
            </div>
            
            <div className="mode-card ai-modes">
              <Bot className="mode-icon" />
              <h3>人間 vs AI</h3>
              <p>コンピュータと対戦しよう</p>
              
              <div className="difficulty-buttons">
                <button 
                  className="difficulty-btn easy"
                  onClick={() => startGame('pvc', 'easy')}
                >
                  簡単
                </button>
                <button 
                  className="difficulty-btn normal"
                  onClick={() => startGame('pvc', 'normal')}
                >
                  普通
                </button>
                <button 
                  className="difficulty-btn hard"
                  onClick={() => startGame('pvc', 'hard')}
                >
                  難しい
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="othello-game">
      <div className="container">
        {gameStatus === 'menu' && renderMenu()}
        
        {gameStatus !== 'menu' && (
          <>
            <header className="game-header">
              <div className="header-content">
                <div className="title-section">
                  <h1 className="game-title">
                    <Circle className="title-icon" />
                    オセロゲーム
                  </h1>
                  {gameMode === 'pvc' && (
                    <div className="game-mode-info">
                      <Bot className="mode-icon-small" />
                      <span>AI対戦 ({aiDifficulty === 'easy' ? '簡単' : aiDifficulty === 'normal' ? '普通' : '難しい'})</span>
                    </div>
                  )}
                </div>
                <button className="back-to-menu-btn" onClick={backToMenu}>
                  <Home className="btn-icon" />
                  メニューに戻る
                </button>
              </div>
            </header>
          </>
        )}

        <div className="game-layout">
          <div className="game-info">
            <div className="score-board">
              <h2>スコア</h2>
              <div className="scores">
                <div className={`score-item ${currentPlayer === 1 ? 'active' : ''}`}>
                  <div className="score-stone black"></div>
                  <span className="score-label">黒</span>
                  <span className="score-value">{scores.black}</span>
                </div>
                <div className={`score-item ${currentPlayer === 2 ? 'active' : ''}`}>
                  <div className="score-stone white"></div>
                  <span className="score-label">白</span>
                  <span className="score-value">{scores.white}</span>
                </div>
              </div>
            </div>

            <div className="game-status">
              {gameStatus === 'playing' ? (
                <div className="current-player">
                  {isAiThinking ? (
                    <>
                      <Brain className="status-icon thinking" />
                      <span>AIが思考中</span>
                      <div className="thinking-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </>
                  ) : (
                    <>
                      {gameMode === 'pvc' && currentPlayer === aiPlayer ? (
                        <Bot className="status-icon" />
                      ) : (
                        <User className="status-icon" />
                      )}
                      <span>現在のプレイヤー: </span>
                      <span className={`player-name ${currentPlayer === 1 ? 'black' : 'white'}`}>
                        {gameMode === 'pvc' && currentPlayer === aiPlayer ? 
                          `AI (${currentPlayer === 1 ? '黒' : '白'})` : 
                          `${currentPlayer === 1 ? '黒' : '白'}`}
                      </span>
                    </>
                  )}
                </div>
              ) : (
                <div className="game-finished">
                  <Trophy className="trophy-icon" />
                  <div className="winner-text">
                    {winner === 'draw' ? '引き分け！' : 
                     winner === 'black' ? '黒の勝利！' : '白の勝利！'}
                  </div>
                </div>
              )}
            </div>

            <div className="game-controls">
              <button 
                className="control-btn hint-btn"
                onClick={toggleHints}
              >
                <Lightbulb className="btn-icon" />
                ヒント {showHints ? 'OFF' : 'ON'}
              </button>
              
              <button 
                className="control-btn reset-btn"
                onClick={resetGame}
              >
                <RotateCcw className="btn-icon" />
                リセット
              </button>
            </div>

            {validMoves.length === 0 && gameStatus === 'playing' && (
              <div className="no-moves">
                打てる場所がありません。パスします。
              </div>
            )}
          </div>

          <div className="game-board-container">
            <div className="game-board">
              {board.map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                  {row.map((_, colIndex) => (
                    <div key={`${rowIndex}-${colIndex}`}>
                      {getCellContent(rowIndex, colIndex)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {gameStatus === 'finished' && (
          <div className="game-over-modal">
            <div className="modal-content">
              <Trophy className="modal-trophy" />
              <h2 className="modal-title">ゲーム終了</h2>
              <div className="final-scores">
                <div className="final-score">
                  <div className="score-stone black"></div>
                  <span>黒: {scores.black}</span>
                </div>
                <div className="final-score">
                  <div className="score-stone white"></div>
                  <span>白: {scores.white}</span>
                </div>
              </div>
              <div className="modal-winner">
                {winner === 'draw' ? '引き分けです！' : 
                 winner === 'black' ? '黒の勝利です！' : '白の勝利です！'}
              </div>
              <button className="modal-btn" onClick={resetGame}>
                <Play className="btn-icon" />
                もう一度プレイ
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .othello-game {
          min-height: 100vh;
          background: linear-gradient(135deg, #2d5a27 0%, #1a3a17 100%);
          position: relative;
          padding: 2rem 0;
        }

        .othello-game::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
          pointer-events: none;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }

        .menu-screen {
          text-align: center;
          color: white;
        }

        .menu-options {
          max-width: 800px;
          margin: 0 auto;
        }

        .section-title {
          font-size: 1.5rem;
          margin-bottom: 2rem;
          font-weight: 600;
        }

        .mode-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .mode-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 1.5rem;
          padding: 2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #1f2937;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .mode-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .mode-icon {
          width: 3rem;
          height: 3rem;
          color: #4ade80;
          margin-bottom: 1rem;
        }

        .mode-card h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .mode-card p {
          color: #6b7280;
          margin-bottom: 1rem;
        }

        .ai-modes {
          cursor: default;
        }

        .ai-modes:hover {
          transform: none;
        }

        .difficulty-buttons {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
        }

        .difficulty-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .difficulty-btn.easy {
          background: #dcfce7;
          color: #166534;
        }

        .difficulty-btn.easy:hover {
          background: #bbf7d0;
          transform: translateY(-2px);
        }

        .difficulty-btn.normal {
          background: #fef3c7;
          color: #92400e;
        }

        .difficulty-btn.normal:hover {
          background: #fde68a;
          transform: translateY(-2px);
        }

        .difficulty-btn.hard {
          background: #fee2e2;
          color: #dc2626;
        }

        .difficulty-btn.hard:hover {
          background: #fecaca;
          transform: translateY(-2px);
        }

        .game-header {
          text-align: center;
          margin-bottom: 3rem;
          color: white;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .title-section {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .game-mode-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
          opacity: 0.8;
          margin-top: 0.5rem;
        }

        .mode-icon-small {
          width: 1rem;
          height: 1rem;
        }

        .back-to-menu-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .back-to-menu-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .btn-icon {
          width: 1rem;
          height: 1rem;
        }

        .game-title {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .title-icon {
          width: 3rem;
          height: 3rem;
          color: #4ade80;
        }

        .game-subtitle {
          font-size: 1.2rem;
          opacity: 0.9;
          margin: 0;
        }

        .game-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 3rem;
          align-items: start;
        }

        .game-info {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 1.5rem;
          padding: 2rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .score-board h2 {
          margin: 0 0 1.5rem 0;
          color: #1f2937;
          font-size: 1.3rem;
          text-align: center;
        }

        .scores {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .score-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #f8fafc;
          border-radius: 1rem;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .score-item.active {
          background: #e0f2fe;
          border-color: #0ea5e9;
          transform: scale(1.05);
        }

        .score-stone {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          border: 2px solid #374151;
        }

        .score-stone.black {
          background: #1f2937;
        }

        .score-stone.white {
          background: #ffffff;
        }

        .score-label {
          font-weight: 600;
          color: #374151;
          flex: 1;
        }

        .score-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: #1f2937;
        }

        .game-status {
          margin: 2rem 0;
          padding: 1.5rem;
          background: #f0f9ff;
          border-radius: 1rem;
          text-align: center;
        }

        .current-player {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 600;
          color: #1f2937;
        }

        .status-icon {
          width: 1.2rem;
          height: 1.2rem;
          color: #0ea5e9;
        }

        .status-icon.thinking {
          animation: thinking 1.5s ease-in-out infinite;
        }

        @keyframes thinking {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .thinking-dots {
          display: flex;
          gap: 0.2rem;
          margin-left: 0.5rem;
        }

        .thinking-dots span {
          width: 0.3rem;
          height: 0.3rem;
          background: #0ea5e9;
          border-radius: 50%;
          animation: thinking-dots 1.5s ease-in-out infinite;
        }

        .thinking-dots span:nth-child(1) {
          animation-delay: 0s;
        }

        .thinking-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .thinking-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes thinking-dots {
          0%, 80%, 100% { transform: scale(1); opacity: 0.5; }
          40% { transform: scale(1.3); opacity: 1; }
        }

        .player-name.black {
          color: #1f2937;
        }

        .player-name.white {
          color: #6b7280;
        }

        .game-finished {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .trophy-icon {
          width: 2rem;
          height: 2rem;
          color: #f59e0b;
        }

        .winner-text {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1f2937;
        }

        .game-controls {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .control-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .hint-btn {
          background: #fef3c7;
          color: #92400e;
        }

        .hint-btn:hover {
          background: #fde68a;
          transform: translateY(-2px);
        }

        .reset-btn {
          background: #fee2e2;
          color: #dc2626;
        }

        .reset-btn:hover {
          background: #fecaca;
          transform: translateY(-2px);
        }

        .btn-icon {
          width: 1rem;
          height: 1rem;
        }

        .no-moves {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          color: #856404;
          padding: 1rem;
          border-radius: 0.75rem;
          text-align: center;
          font-weight: 600;
          margin-top: 1rem;
        }

        .game-board-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .game-board {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 2px;
          background: #1f2937;
          padding: 1rem;
          border-radius: 1rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .cell {
          width: 60px;
          height: 60px;
          background: #4ade80;
          border-radius: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
        }

        .cell:hover {
          background: #22c55e;
        }

        .cell.valid-move {
          background: #86efac;
        }

        .cell.valid-move:hover {
          background: #bbf7d0;
        }

        .stone {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid #374151;
          transition: all 0.3s ease;
          position: relative;
        }

        .stone.black {
          background: radial-gradient(circle at 30% 30%, #4b5563, #1f2937);
          box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .stone.white {
          background: radial-gradient(circle at 30% 30%, #ffffff, #e5e7eb);
          box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .hint-dot {
          width: 20px;
          height: 20px;
          background: rgba(59, 130, 246, 0.7);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        .game-over-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: 3rem;
          border-radius: 2rem;
          text-align: center;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
          max-width: 400px;
          width: 90%;
        }

        .modal-trophy {
          width: 4rem;
          height: 4rem;
          color: #f59e0b;
          margin-bottom: 1rem;
        }

        .modal-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 2rem;
        }

        .final-scores {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .final-score {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.2rem;
          font-weight: 600;
          color: #374151;
        }

        .modal-winner {
          font-size: 1.3rem;
          font-weight: 700;
          color: #059669;
          margin-bottom: 2rem;
        }

        .modal-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 1rem;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin: 0 auto;
        }

        .modal-btn:hover {
          background: #059669;
          transform: translateY(-2px);
        }

        @media (max-width: 1024px) {
          .game-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .game-info {
            order: 2;
          }

          .game-board-container {
            order: 1;
          }

          .mode-cards {
            grid-template-columns: 1fr;
          }

          .header-content {
            flex-direction: column;
            text-align: center;
          }

          .title-section {
            align-items: center;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 1rem;
          }

          .game-title {
            font-size: 2rem;
          }

          .title-icon {
            width: 2rem;
            height: 2rem;
          }

          .cell {
            width: 45px;
            height: 45px;
          }

          .stone {
            width: 38px;
            height: 38px;
          }

          .game-board {
            padding: 0.5rem;
          }

          .modal-content {
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default OthelloGame;
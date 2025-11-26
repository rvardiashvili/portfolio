import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Trophy, RotateCcw, Play } from 'lucide-react';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

export default function SnakeGame({ onClose }) {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('snake_highscore')) || 0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  
  const directionRef = useRef('RIGHT'); // Ref to prevent rapid key switches colliding
  const gameLoopRef = useRef(null);

  const generateFood = useCallback((currentSnake) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      const isOnSnake = currentSnake.some(seg => seg.x === newFood.x && seg.y === newFood.y);
      if (!isOnSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood([{ x: 10, y: 10 }]));
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    setGameStarted(true);
  };

  const handleKeyDown = useCallback((e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
      e.preventDefault();
    }

    if (e.key === 'Escape') {
        onClose();
        return;
    }

    if (e.key === ' ' && gameStarted && !gameOver) {
        setIsPaused(prev => !prev);
        return;
    }

    if (gameOver || isPaused || !gameStarted) return;

    const currentDir = directionRef.current;

    switch (e.key) {
      case 'ArrowUp':
        if (currentDir !== 'DOWN') directionRef.current = 'UP';
        break;
      case 'ArrowDown':
        if (currentDir !== 'UP') directionRef.current = 'DOWN';
        break;
      case 'ArrowLeft':
        if (currentDir !== 'RIGHT') directionRef.current = 'LEFT';
        break;
      case 'ArrowRight':
        if (currentDir !== 'LEFT') directionRef.current = 'RIGHT';
        break;
    }
  }, [gameOver, isPaused, gameStarted, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (gameOver || isPaused || !gameStarted) return;

    const moveSnake = () => {
      setDirection(directionRef.current);
      const head = { ...snake[0] };

      switch (directionRef.current) {
        case 'UP': head.y -= 1; break;
        case 'DOWN': head.y += 1; break;
        case 'LEFT': head.x -= 1; break;
        case 'RIGHT': head.x += 1; break;
      }

      // Check collisions
      if (
        head.x < 0 || head.x >= GRID_SIZE ||
        head.y < 0 || head.y >= GRID_SIZE ||
        snake.some(seg => seg.x === head.x && seg.y === head.y)
      ) {
        setGameOver(true);
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('snake_highscore', score);
        }
        return;
      }

      const newSnake = [head, ...snake];

      // Check food
      if (head.x === food.x && head.y === food.y) {
        setScore(s => s + 1);
        setFood(generateFood(newSnake));
        // Don't pop tail (grow)
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    gameLoopRef.current = setInterval(moveSnake, Math.max(50, INITIAL_SPEED - (score * 2)));
    return () => clearInterval(gameLoopRef.current);
  }, [snake, food, gameOver, isPaused, gameStarted, score, highScore, generateFood]);

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative bg-[#1e1b29] border-2 border-purple-500/50 rounded-xl p-6 shadow-2xl w-full max-w-md">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
             <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Trophy size={20} className="text-yellow-400" />
                <span className="font-mono">SNAKE</span>
             </h2>
             <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">Retro Mode</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Game Board */}
        <div 
            className="relative bg-black/50 border border-white/10 rounded-lg mx-auto overflow-hidden shadow-inner"
            style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}
        >
            {!gameStarted ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 bg-black/60">
                    <button 
                        onClick={resetGame}
                        className="group flex flex-col items-center gap-3"
                    >
                        <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)] group-hover:scale-110 transition-transform">
                            <Play size={32} className="ml-1 fill-white" />
                        </div>
                        <span className="text-xs font-mono uppercase tracking-widest opacity-80 group-hover:opacity-100">Start Game</span>
                    </button>
                </div>
            ) : gameOver ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 bg-black/80 backdrop-blur-[2px]">
                    <h3 className="text-2xl font-bold text-red-500 mb-2">GAME OVER</h3>
                    <div className="text-center mb-6">
                        <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">Final Score</div>
                        <div className="text-3xl font-mono">{score}</div>
                    </div>
                    <button 
                        onClick={resetGame}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-bold hover:bg-purple-400 hover:text-white transition-colors"
                    >
                        <RotateCcw size={18} />
                        Try Again
                    </button>
                </div>
            ) : isPaused && (
                <div className="absolute inset-0 flex items-center justify-center text-white z-10 bg-black/40 backdrop-blur-[1px]">
                    <span className="text-2xl font-mono font-bold tracking-[0.5em]">PAUSED</span>
                </div>
            )}

            {/* Snake & Food */}
            {snake.map((seg, i) => (
                <div 
                    key={i}
                    className="absolute rounded-sm transition-all duration-100"
                    style={{
                        left: seg.x * CELL_SIZE,
                        top: seg.y * CELL_SIZE,
                        width: CELL_SIZE - 1,
                        height: CELL_SIZE - 1,
                        backgroundColor: i === 0 ? '#a855f7' : '#e879f9', // Purple head, lighter body
                        zIndex: i === 0 ? 2 : 1,
                        boxShadow: i === 0 ? '0 0 10px rgba(168,85,247,0.8)' : 'none'
                    }}
                />
            ))}
            <div 
                className="absolute rounded-full animate-pulse"
                style={{
                    left: food.x * CELL_SIZE,
                    top: food.y * CELL_SIZE,
                    width: CELL_SIZE - 2,
                    height: CELL_SIZE - 2,
                    backgroundColor: '#4ade80', // Green food
                    boxShadow: '0 0 8px #4ade80'
                }}
            />
        </div>

        {/* Footer Stats */}
        <div className="mt-6 flex justify-between items-end px-2">
            <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Score</span>
                <span className="text-2xl font-mono text-white">{score}</span>
            </div>
            <div className="flex flex-col text-right">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">High Score</span>
                <span className="text-2xl font-mono text-purple-400">{highScore}</span>
            </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/10 text-center">
            <p className="text-[10px] text-slate-500 font-mono">Use Arrow Keys to move • Space to Pause</p>
        </div>

      </div>
    </div>
  );
}

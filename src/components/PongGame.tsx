import { useEffect, useRef, useState } from 'preact/hooks';
import { useKeyboard } from '@/hooks/useKeyboard';
import { drawGame, resetBall, movePaddle, checkBallPaddleCollision, checkBallWallCollision } from '@/utils/gameUtils';
import type { GameState, GameConfig } from '@/types/game';

const GAME_CONFIG: GameConfig = {
    canvasWidth: 800,
    canvasHeight: 400,
    paddleWidth: 10,
    paddleHeight: 80,
    ballSize: 10,
    paddleSpeed: 6,
    ballSpeed: 5,
};

export default function PongGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();
    const keys = useKeyboard();
    
    const [gameState, setGameState] = useState<GameState>({
        ball: {
            x: GAME_CONFIG.canvasWidth / 2,
            y: GAME_CONFIG.canvasHeight / 2,
            dx: GAME_CONFIG.ballSpeed,
            dy: GAME_CONFIG.ballSpeed,
            size: GAME_CONFIG.ballSize,
        },
        leftPaddle: {
            x: 0,
            y: GAME_CONFIG.canvasHeight / 2 - GAME_CONFIG.paddleHeight / 2,
            width: GAME_CONFIG.paddleWidth,
            height: GAME_CONFIG.paddleHeight,
        },
        rightPaddle: {
            x: GAME_CONFIG.canvasWidth - GAME_CONFIG.paddleWidth,
            y: GAME_CONFIG.canvasHeight / 2 - GAME_CONFIG.paddleHeight / 2,
            width: GAME_CONFIG.paddleWidth,
            height: GAME_CONFIG.paddleHeight,
        },
        score: {
            left: 0,
            right: 0,
        },
        gameRunning: false,
        gameConfig: GAME_CONFIG,
    });

    // Main game loop
    useEffect(() => {
        if (!gameState.gameRunning) return;

        const gameLoop = () => {
            setGameState(prevState => {
                const newState = { ...prevState };
                
                // Deep copies to avoid mutation
                const ball = { ...newState.ball };
                const leftPaddle = { ...newState.leftPaddle };
                const rightPaddle = { ...newState.rightPaddle };
                const score = { ...newState.score };

                // Move paddles
                if (keys.has('w')) {
                    movePaddle(leftPaddle, 'up', GAME_CONFIG.paddleSpeed, GAME_CONFIG.canvasHeight);
                }
                if (keys.has('s')) {
                    movePaddle(leftPaddle, 'down', GAME_CONFIG.paddleSpeed, GAME_CONFIG.canvasHeight);
                }
                if (keys.has('arrowup')) {
                    movePaddle(rightPaddle, 'up', GAME_CONFIG.paddleSpeed, GAME_CONFIG.canvasHeight);
                }
                if (keys.has('arrowdown')) {
                    movePaddle(rightPaddle, 'down', GAME_CONFIG.paddleSpeed, GAME_CONFIG.canvasHeight);
                }

                // Move ball
                ball.x += ball.dx;
                ball.y += ball.dy;

                // Collision with top/bottom walls
                if (checkBallWallCollision(ball, GAME_CONFIG.canvasHeight)) {
                    ball.dy = -ball.dy;
                }

                // Collision with left paddle
                if (checkBallPaddleCollision(ball, leftPaddle) && ball.dx < 0) {
                    ball.dx = -ball.dx;
                    ball.x = leftPaddle.x + leftPaddle.width + 1;
                    
                    // Add angle variation based on where the paddle is hit
                    const paddleCenter = leftPaddle.y + leftPaddle.height / 2;
                    const hitPos = (ball.y - paddleCenter) / (leftPaddle.height / 2);
                    ball.dy += hitPos * 2;
                }

                // Collision with right paddle
                if (checkBallPaddleCollision(ball, rightPaddle) && ball.dx > 0) {
                    ball.dx = -ball.dx;
                    ball.x = rightPaddle.x - ball.size - 1;
                    
                    // Add angle variation based on where the paddle is hit
                    const paddleCenter = rightPaddle.y + rightPaddle.height / 2;
                    const hitPos = (ball.y - paddleCenter) / (rightPaddle.height / 2);
                    ball.dy += hitPos * 2;
                }

                // Limit vertical speed
                ball.dy = Math.max(-8, Math.min(8, ball.dy));

                // Scoring
                if (ball.x < 0) {
                    score.right++;
                    resetBall(ball, GAME_CONFIG);
                }
                if (ball.x > GAME_CONFIG.canvasWidth) {
                    score.left++;
                    resetBall(ball, GAME_CONFIG);
                }

                return {
                    ...newState,
                    ball,
                    leftPaddle,
                    rightPaddle,
                    score,
                };
            });

            animationRef.current = requestAnimationFrame(gameLoop);
        };

        animationRef.current = requestAnimationFrame(gameLoop);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [gameState.gameRunning, keys]);

    // Render game
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        drawGame(ctx, gameState.ball, gameState.leftPaddle, gameState.rightPaddle, GAME_CONFIG);
    }, [gameState]);

    const startGame = () => {
        setGameState(prev => ({ ...prev, gameRunning: true }));
    };

    const pauseGame = () => {
        setGameState(prev => ({ ...prev, gameRunning: false }));
    };

    const resetGame = () => {
        setGameState(prev => ({
            ...prev,
            ball: {
                x: GAME_CONFIG.canvasWidth / 2,
                y: GAME_CONFIG.canvasHeight / 2,
                dx: GAME_CONFIG.ballSpeed,
                dy: GAME_CONFIG.ballSpeed,
                size: GAME_CONFIG.ballSize,
            },
            leftPaddle: {
                x: 0,
                y: GAME_CONFIG.canvasHeight / 2 - GAME_CONFIG.paddleHeight / 2,
                width: GAME_CONFIG.paddleWidth,
                height: GAME_CONFIG.paddleHeight,
            },
            rightPaddle: {
                x: GAME_CONFIG.canvasWidth - GAME_CONFIG.paddleWidth,
                y: GAME_CONFIG.canvasHeight / 2 - GAME_CONFIG.paddleHeight / 2,
                width: GAME_CONFIG.paddleWidth,
                height: GAME_CONFIG.paddleHeight,
            },
            score: {
                left: 0,
                right: 0,
            },
            gameRunning: false,
        }));
    };

    return (
        <div class="flex flex-col items-center justify-center min-h-screen p-4">
            {/* Header with title and GitHub button */}
            <div class="flex items-center justify-center gap-6 mb-8">
                <h1 class="text-4xl font-bold text-green-400 animate-pulse">PONG</h1>
                <a 
                    href="https://github.com/zkjon/pong" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg transition-colors duration-200 text-sm font-medium text-white hover:text-green-400"
                >
                    <svg 
                        class="w-5 h-5" 
                        fill="currentColor" 
                        viewBox="0 0 20 20" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            fill-rule="evenodd" 
                            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" 
                            clip-rule="evenodd"
                        />
                    </svg>
                    ⭐ Star me on GitHub
                </a>
            </div>
            
            {/* Scoreboard */}
            <div class="flex gap-8 mb-4 text-2xl font-bold">
                <div class="text-center p-4 border-2 border-green-400 rounded-lg bg-green-400/10">
                    <div class="text-green-400 text-sm mb-1">PLAYER 1</div>
                    <div class="text-4xl font-mono">{gameState.score.left.toString().padStart(2, '0')}</div>
                </div>
                <div class="text-center text-green-400 flex items-center">VS</div>
                <div class="text-center p-4 border-2 border-green-400 rounded-lg bg-green-400/10">
                    <div class="text-green-400 text-sm mb-1">PLAYER 2</div>
                    <div class="text-4xl font-mono">{gameState.score.right.toString().padStart(2, '0')}</div>
                </div>
            </div>

            {/* Game canvas */}
            <div class="relative mb-4">
                <canvas
                    ref={canvasRef}
                    width={GAME_CONFIG.canvasWidth}
                    height={GAME_CONFIG.canvasHeight}
                    class="border-2 border-green-400 bg-black shadow-lg shadow-green-400/20"
                />
                {!gameState.gameRunning && (
                    <div class="absolute inset-0 flex items-center justify-center bg-black/80">
                        <div class="text-center">
                            <div class="text-green-400 text-2xl mb-2">
                                {gameState.score.left === 0 && gameState.score.right === 0 ? 'PRESS START' : 'GAME PAUSED'}
                            </div>
                            <div class="text-sm text-gray-400">
                                Press Start to {gameState.score.left === 0 && gameState.score.right === 0 ? 'begin' : 'continue'}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div class="flex gap-4 mb-6">
                <button
                    onClick={startGame}
                    disabled={gameState.gameRunning}
                    class="px-6 py-3 bg-green-600 text-white rounded-lg disabled:bg-gray-600 hover:bg-green-700 transition-all duration-200 font-bold shadow-lg disabled:shadow-none"
                >
                    {gameState.score.left === 0 && gameState.score.right === 0 ? 'START' : 'RESUME'}
                </button>
                <button
                    onClick={pauseGame}
                    disabled={!gameState.gameRunning}
                    class="px-6 py-3 bg-yellow-600 text-white rounded-lg disabled:bg-gray-600 hover:bg-yellow-700 transition-all duration-200 font-bold shadow-lg disabled:shadow-none"
                >
                    PAUSE
                </button>
                <button
                    onClick={resetGame}
                    class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-bold shadow-lg"
                >
                    RESET
                </button>
            </div>

            {/* Instructions */}
            <div class="text-center text-sm text-gray-400 max-w-md bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                <p class="mb-3 text-green-400 font-bold">🎮 CONTROLS</p>
                <div class="grid grid-cols-2 gap-4 text-xs text-left">
                    <div>
                        <p class="font-bold text-white mb-1">Player 1</p>
                        <div class="flex items-center gap-2 mb-1">
                            <kbd class="bg-gray-700 px-2 py-1 rounded">W</kbd>
                            <span>Up</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <kbd class="bg-gray-700 px-2 py-1 rounded">S</kbd>
                            <span>Down</span>
                        </div>
                    </div>
                    <div>
                        <p class="font-bold text-white mb-1">Player 2</p>
                        <div class="flex items-center gap-2 mb-1">
                            <kbd class="bg-gray-700 px-2 py-1 rounded">↑</kbd>
                            <span>Up</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <kbd class="bg-gray-700 px-2 py-1 rounded">↓</kbd>
                            <span>Down</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

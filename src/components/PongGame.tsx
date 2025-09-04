import { useEffect, useRef, useState } from "preact/hooks";
import { useKeyboard } from "@/hooks/useKeyboard";
import {
  drawGame,
  resetBall,
  movePaddle,
  checkBallPaddleCollision,
  checkBallWallCollision,
} from "@/utils/gameUtils";
import type { GameState, GameConfig } from "@/types/game";
import GameHeader from "./GameHeader";
import Scoreboard from "./Scoreboard";
import GameCanvas from "./GameCanvas";
import GameControls from "./GameControls";
import GameInstructions from "./GameInstructions";

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
      setGameState((prevState) => {
        const newState = { ...prevState };

        // Deep copies to avoid mutation
        const ball = { ...newState.ball };
        const leftPaddle = { ...newState.leftPaddle };
        const rightPaddle = { ...newState.rightPaddle };
        const score = { ...newState.score };

        // Move paddles
        if (keys.has("w")) {
          movePaddle(
            leftPaddle,
            "up",
            GAME_CONFIG.paddleSpeed,
            GAME_CONFIG.canvasHeight,
          );
        }
        if (keys.has("s")) {
          movePaddle(
            leftPaddle,
            "down",
            GAME_CONFIG.paddleSpeed,
            GAME_CONFIG.canvasHeight,
          );
        }
        if (keys.has("arrowup")) {
          movePaddle(
            rightPaddle,
            "up",
            GAME_CONFIG.paddleSpeed,
            GAME_CONFIG.canvasHeight,
          );
        }
        if (keys.has("arrowdown")) {
          movePaddle(
            rightPaddle,
            "down",
            GAME_CONFIG.paddleSpeed,
            GAME_CONFIG.canvasHeight,
          );
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

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawGame(
      ctx,
      gameState.ball,
      gameState.leftPaddle,
      gameState.rightPaddle,
      GAME_CONFIG,
    );
  }, [gameState]);

  const startGame = () => {
    setGameState((prev) => ({ ...prev, gameRunning: true }));
  };

  const pauseGame = () => {
    setGameState((prev) => ({ ...prev, gameRunning: false }));
  };

  const resetGame = () => {
    setGameState((prev) => ({
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
      <GameHeader />

      <Scoreboard
        leftScore={gameState.score.left}
        rightScore={gameState.score.right}
      />

      <GameCanvas
        gameConfig={GAME_CONFIG}
        isGameRunning={gameState.gameRunning}
        leftScore={gameState.score.left}
        rightScore={gameState.score.right}
        canvasRef={canvasRef}
      />

      <GameControls
        isGameRunning={gameState.gameRunning}
        leftScore={gameState.score.left}
        rightScore={gameState.score.right}
        onStart={startGame}
        onPause={pauseGame}
        onReset={resetGame}
      />

      <GameInstructions />
    </div>
  );
}

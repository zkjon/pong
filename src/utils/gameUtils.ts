import type { Ball, Paddle, GameConfig, AIConfig, DifficultyLevel } from "@/types/game";

export function checkBallPaddleCollision(ball: Ball, paddle: Paddle): boolean {
  return (
    ball.x < paddle.x + paddle.width &&
    ball.x + ball.size > paddle.x &&
    ball.y < paddle.y + paddle.height &&
    ball.y + ball.size > paddle.y
  );
}

export function checkBallWallCollision(
  ball: Ball,
  canvasHeight: number,
): boolean {
  return ball.y <= 0 || ball.y >= canvasHeight - ball.size;
}

export function resetBall(ball: Ball, config: GameConfig): void {
  ball.x = config.canvasWidth / 2;
  ball.y = config.canvasHeight / 2;
  ball.dx = (Math.random() > 0.5 ? 1 : -1) * config.ballSpeed;
  ball.dy = (Math.random() > 0.5 ? 1 : -1) * config.ballSpeed;
}

export function movePaddle(
  paddle: Paddle,
  direction: "up" | "down",
  speed: number,
  canvasHeight: number,
): void {
  if (direction === "up" && paddle.y > 0) {
    paddle.y -= speed;
  } else if (direction === "down" && paddle.y < canvasHeight - paddle.height) {
    paddle.y += speed;
  }
}

export function drawGame(
  ctx: CanvasRenderingContext2D,
  ball: Ball,
  leftPaddle: Paddle,
  rightPaddle: Paddle,
  config: GameConfig,
): void {
  // Clear canvas
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, config.canvasWidth, config.canvasHeight);

  // Draw center line
  ctx.setLineDash([5, 15]);
  ctx.beginPath();
  ctx.moveTo(config.canvasWidth / 2, 0);
  ctx.lineTo(config.canvasWidth / 2, config.canvasHeight);
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();
  ctx.setLineDash([]);

  // Draw game elements
  ctx.fillStyle = "#ffffff";

  // Left paddle
  ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);

  // Right paddle
  ctx.fillRect(
    rightPaddle.x,
    rightPaddle.y,
    rightPaddle.width,
    rightPaddle.height,
  );

  // Ball
  ctx.fillRect(ball.x, ball.y, ball.size, ball.size);
}

export function getAIConfigForDifficulty(difficulty: DifficultyLevel): AIConfig {
  switch (difficulty) {
    case 'easy':
      return {
        reactionSpeed: 0.6,
        accuracy: 0.7,
        difficultyLevel: difficulty,
      };
    case 'medium':
      return {
        reactionSpeed: 0.8,
        accuracy: 0.85,
        difficultyLevel: difficulty,
      };
    case 'hard':
      return {
        reactionSpeed: 0.95,
        accuracy: 0.95,
        difficultyLevel: difficulty,
      };
    default:
      return getAIConfigForDifficulty('medium');
  }
}

export function updateAIPaddle(
  paddle: Paddle,
  ball: Ball,
  config: GameConfig,
  aiConfig: AIConfig,
  canvasHeight: number,
): void {
  // Only move if ball is coming towards AI paddle (right side)
  if (ball.dx <= 0) return;

  // Calculate target position for paddle center
  const paddleCenter = paddle.y + paddle.height / 2;
  const _ballCenterY = ball.y + ball.size / 2;
  
  // Add some prediction based on ball velocity
  const timeToReachPaddle = (paddle.x - ball.x) / Math.abs(ball.dx);
  const predictedBallY = ball.y + ball.dy * timeToReachPaddle * aiConfig.accuracy;
  
  // Add some randomness based on accuracy
  const accuracyOffset = (Math.random() - 0.5) * paddle.height * (1 - aiConfig.accuracy);
  const targetY = predictedBallY + accuracyOffset;
  
  // Calculate the difference between current position and target
  const diff = targetY - paddleCenter;
  
  // Only move if difference is significant enough (reaction speed factor)
  const minMovement = paddle.height * 0.1;
  if (Math.abs(diff) < minMovement) return;
  
  // Apply reaction speed - AI doesn't move instantly
  const shouldMove = Math.random() < aiConfig.reactionSpeed;
  if (!shouldMove) return;
  
  // Move towards target position
  const moveSpeed = config.paddleSpeed * aiConfig.reactionSpeed;
  if (diff > 0) {
    movePaddle(paddle, 'down', moveSpeed, canvasHeight);
  } else {
    movePaddle(paddle, 'up', moveSpeed, canvasHeight);
  }
}

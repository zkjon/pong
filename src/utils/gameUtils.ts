import type { Ball, Paddle, GameConfig } from '@/types/game';

export function checkBallPaddleCollision(ball: Ball, paddle: Paddle): boolean {
    return (
        ball.x < paddle.x + paddle.width &&
        ball.x + ball.size > paddle.x &&
        ball.y < paddle.y + paddle.height &&
        ball.y + ball.size > paddle.y
    );
}

export function checkBallWallCollision(ball: Ball, canvasHeight: number): boolean {
    return ball.y <= 0 || ball.y >= canvasHeight - ball.size;
}

export function resetBall(ball: Ball, config: GameConfig): void {
    ball.x = config.canvasWidth / 2;
    ball.y = config.canvasHeight / 2;
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * config.ballSpeed;
    ball.dy = (Math.random() > 0.5 ? 1 : -1) * config.ballSpeed;
}

export function movePaddle(paddle: Paddle, direction: 'up' | 'down', speed: number, canvasHeight: number): void {
    if (direction === 'up' && paddle.y > 0) {
        paddle.y -= speed;
    } else if (direction === 'down' && paddle.y < canvasHeight - paddle.height) {
        paddle.y += speed;
    }
}

export function drawGame(
    ctx: CanvasRenderingContext2D,
    ball: Ball,
    leftPaddle: Paddle,
    rightPaddle: Paddle,
    config: GameConfig
): void {
    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, config.canvasWidth, config.canvasHeight);

    // Draw center line
    ctx.setLineDash([5, 15]);
    ctx.beginPath();
    ctx.moveTo(config.canvasWidth / 2, 0);
    ctx.lineTo(config.canvasWidth / 2, config.canvasHeight);
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw game elements
    ctx.fillStyle = '#ffffff';
    
    // Left paddle
    ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    
    // Right paddle
    ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    
    // Ball
    ctx.fillRect(ball.x, ball.y, ball.size, ball.size);
}

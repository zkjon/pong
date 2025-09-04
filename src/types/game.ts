export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  dx: number;
  dy: number;
}

export interface Ball extends Position, Velocity {
  size: number;
}

export interface Paddle extends Position {
  width: number;
  height: number;
}

export interface Score {
  left: number;
  right: number;
}

export type GameMode = 'twoPlayer' | 'singlePlayer';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface AIConfig {
  reactionSpeed: number; // How fast AI reacts (0-1, where 1 is instant)
  accuracy: number; // How accurately AI tracks the ball (0-1)
  difficultyLevel: DifficultyLevel;
}

export interface GameConfig {
  canvasWidth: number;
  canvasHeight: number;
  paddleWidth: number;
  paddleHeight: number;
  ballSize: number;
  paddleSpeed: number;
  ballSpeed: number;
}

export interface GameState {
  ball: Ball;
  leftPaddle: Paddle;
  rightPaddle: Paddle;
  score: Score;
  gameRunning: boolean;
  gameConfig: GameConfig;
  gameMode: GameMode;
  aiConfig: AIConfig;
}

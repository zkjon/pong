import type { GameMode } from "@/types/game";

interface ScoreboardProps {
  leftScore: number;
  rightScore: number;
  gameMode: GameMode;
}

export default function Scoreboard({ leftScore, rightScore, gameMode }: ScoreboardProps) {
  const leftLabel = gameMode === 'singlePlayer' ? 'PLAYER' : 'PLAYER 1';
  const rightLabel = gameMode === 'singlePlayer' ? 'AI' : 'PLAYER 2';
  const rightColor = gameMode === 'singlePlayer' ? 'red' : 'green';

  return (
    <div class="flex gap-8 mb-4 text-2xl font-bold">
      <div class="text-center p-4 border-2 border-green-400 rounded-lg bg-green-400/10">
        <div class="text-green-400 text-sm mb-1">{leftLabel}</div>
        <div class="text-4xl font-mono">
          {leftScore.toString().padStart(2, "0")}
        </div>
      </div>
      <div class="text-center text-green-400 flex items-center">VS</div>
      <div class={`text-center p-4 border-2 border-${rightColor}-400 rounded-lg bg-${rightColor}-400/10`}>
        <div class={`text-${rightColor}-400 text-sm mb-1`}>{rightLabel}</div>
        <div class="text-4xl font-mono">
          {rightScore.toString().padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}

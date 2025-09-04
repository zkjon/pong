import type { Ref } from "preact";
import type { GameConfig } from "@/types/game";

interface GameCanvasProps {
  gameConfig: GameConfig;
  isGameRunning: boolean;
  leftScore: number;
  rightScore: number;
  canvasRef: Ref<HTMLCanvasElement>;
}

export default function GameCanvas({
  gameConfig,
  isGameRunning,
  leftScore,
  rightScore,
  canvasRef,
}: GameCanvasProps) {
  return (
    <div class="relative mb-4">
      <canvas
        ref={canvasRef}
        width={gameConfig.canvasWidth}
        height={gameConfig.canvasHeight}
        class="border-2 border-green-400 bg-black shadow-lg shadow-green-400/20"
      />
      {!isGameRunning && (
        <div class="absolute inset-0 flex items-center justify-center bg-black/80">
          <div class="text-center">
            <div class="text-green-400 text-2xl mb-2">
              {leftScore === 0 && rightScore === 0
                ? "PRESS START"
                : "GAME PAUSED"}
            </div>
            <div class="text-sm text-gray-400">
              Press Start to{" "}
              {leftScore === 0 && rightScore === 0 ? "begin" : "continue"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

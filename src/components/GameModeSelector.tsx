import type { GameMode, DifficultyLevel } from "@/types/game";

interface GameModeSelectorProps {
  gameMode: GameMode;
  difficulty: DifficultyLevel;
  onModeChange: (mode: GameMode) => void;
  onDifficultyChange: (difficulty: DifficultyLevel) => void;
  disabled?: boolean;
}

export default function GameModeSelector({
  gameMode,
  difficulty,
  onModeChange,
  onDifficultyChange,
  disabled = false,
}: GameModeSelectorProps) {
  return (
    <div class="flex flex-col items-center gap-4 mb-4">
      <div class="flex items-center gap-4">
        <label class="text-white font-semibold">Game Mode:</label>
        <div class="flex gap-2">
          <button
            type="button"
            class={`px-4 py-2 rounded transition-colors ${
              gameMode === 'twoPlayer'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => !disabled && onModeChange('twoPlayer')}
            disabled={disabled}
          >
            Two Player
          </button>
          <button
            type="button"
            class={`px-4 py-2 rounded transition-colors ${
              gameMode === 'singlePlayer'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => !disabled && onModeChange('singlePlayer')}
            disabled={disabled}
          >
            Single Player (vs AI)
          </button>
        </div>
      </div>

      {gameMode === 'singlePlayer' && (
        <div class="flex items-center gap-4">
          <label class="text-white font-semibold">AI Difficulty:</label>
          <div class="flex gap-2">
            <button
              type="button"
              class={`px-3 py-1 rounded text-sm transition-colors ${
                difficulty === 'easy'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => !disabled && onDifficultyChange('easy')}
              disabled={disabled}
            >
              Easy
            </button>
            <button
              type="button"
              class={`px-3 py-1 rounded text-sm transition-colors ${
                difficulty === 'medium'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => !disabled && onDifficultyChange('medium')}
              disabled={disabled}
            >
              Medium
            </button>
            <button
              type="button"
              class={`px-3 py-1 rounded text-sm transition-colors ${
                difficulty === 'hard'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => !disabled && onDifficultyChange('hard')}
              disabled={disabled}
            >
              Hard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

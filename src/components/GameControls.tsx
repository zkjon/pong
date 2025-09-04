interface GameControlsProps {
    isGameRunning: boolean;
    leftScore: number;
    rightScore: number;
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
}

export default function GameControls({ 
    isGameRunning, 
    leftScore, 
    rightScore, 
    onStart, 
    onPause, 
    onReset 
}: GameControlsProps) {
    return (
        <div class="flex gap-4 mb-6">
            <button
                type="button"
                onClick={onStart}
                disabled={isGameRunning}
                class="px-6 py-3 bg-green-600 text-white rounded-lg disabled:bg-gray-600 hover:bg-green-700 transition-all duration-200 font-bold shadow-lg disabled:shadow-none"
            >
                {leftScore === 0 && rightScore === 0 ? 'START' : 'RESUME'}
            </button>
            <button
                type="button"
                onClick={onPause}
                disabled={!isGameRunning}
                class="px-6 py-3 bg-yellow-600 text-white rounded-lg disabled:bg-gray-600 hover:bg-yellow-700 transition-all duration-200 font-bold shadow-lg disabled:shadow-none"
            >
                PAUSE
            </button>
            <button
                type="button"
                onClick={onReset}
                class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-bold shadow-lg"
            >
                RESET
            </button>
        </div>
    );
}

export default function GameInstructions() {
    return (
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
    );
}

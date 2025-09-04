interface ScoreboardProps {
    leftScore: number;
    rightScore: number;
}

export default function Scoreboard({ leftScore, rightScore }: ScoreboardProps) {
    return (
        <div class="flex gap-8 mb-4 text-2xl font-bold">
            <div class="text-center p-4 border-2 border-green-400 rounded-lg bg-green-400/10">
                <div class="text-green-400 text-sm mb-1">PLAYER 1</div>
                <div class="text-4xl font-mono">{leftScore.toString().padStart(2, '0')}</div>
            </div>
            <div class="text-center text-green-400 flex items-center">VS</div>
            <div class="text-center p-4 border-2 border-green-400 rounded-lg bg-green-400/10">
                <div class="text-green-400 text-sm mb-1">PLAYER 2</div>
                <div class="text-4xl font-mono">{rightScore.toString().padStart(2, '0')}</div>
            </div>
        </div>
    );
}

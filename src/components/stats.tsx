import useGameStore from "~/game/gameState";

const containerStyles = "flex h-80 w-40 flex-col bg-slate-800 p-4 text-white";

const ProgressBar = ({ percentage }: { percentage: number }) => {
  return (
    <>
      <div className="mb-1 flex justify-end">
        <span className="text-sm font-medium text-blue-700 dark:text-white">
          {percentage}%
        </span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-2.5 rounded-full bg-blue-600"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </>
  );
};

const PlayerStatsScreen = ({
  playerProgressBar,
}: {
  playerProgressBar: number;
}) => {
  const { playerStats } = useGameStore();
  const [currentHealth, maxHealth] = playerStats.health;
  const [currentMana, maxMana] = playerStats.mana;
  return (
    <main className={containerStyles}>
      <div>PLAYER</div>
      <ProgressBar percentage={playerProgressBar} />
      <div>Health</div>
      <div>
        {currentHealth}/{maxHealth}
      </div>
      <div>Mana</div>
      <div>
        {currentMana}/{maxMana}
      </div>
      <div>Str: {playerStats.str}</div>
      <div>Dex: {playerStats.dex}</div>
      <div>Con: {playerStats.con}</div>
      <div>Crit: {playerStats.critPercentage * 100}%</div>
      <div>Crit Dmg: {playerStats.critDamage * 100}%</div>
    </main>
  );
};

const EnemyStatsScreen = ({
  enemyProgressBar,
}: {
  enemyProgressBar: number;
}) => {
  const { enemyStats } = useGameStore();
  const [currentHealth, maxHealth] = enemyStats.health;
  const [currentMana, maxMana] = enemyStats.mana;
  return (
    <main className={containerStyles}>
      <div>MAJOR ENEMY</div>
      <ProgressBar percentage={enemyProgressBar} />
      <div>Health</div>
      <div>
        {currentHealth}/{maxHealth}
      </div>
      <div>Mana</div>
      <div>
        {currentMana}/{maxMana}
      </div>
    </main>
  );
};

export { PlayerStatsScreen, EnemyStatsScreen };

import useGameStore from "~/game/gameState";

const PlayerStatsScreen = () => {
  const { playerStats } = useGameStore();
  const [currentHealth, maxHealth] = playerStats.health;
  const [currentMana, maxMana] = playerStats.mana;
  return (
    <main className="flex h-80 w-32 flex-col bg-slate-800 p-4 text-white">
      <div>PLAYER</div>
      <div>Str: {playerStats.str}</div>
      <div>Dex: {playerStats.dex}</div>
      <div>Con: {playerStats.con}</div>
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

const EnemyStatsScreen = () => {
  const { enemyStats } = useGameStore();
  const [currentHealth, maxHealth] = enemyStats.health;
  const [currentMana, maxMana] = enemyStats.mana;
  return (
    <main className="flex h-80 w-32 flex-col bg-slate-800 p-4 text-white">
      <div>MAJOR ENEMY</div>
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

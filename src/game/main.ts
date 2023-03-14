import { type PlayerStats, type EnemyStats } from "./gameState";

const randomInteger = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Fight = (
  playerStats: PlayerStats,
  enemyStats: EnemyStats,
  isPlayerAttack: boolean
) => {
  const [minPlayerDamage, maxPlayerDamage] = playerStats.damage;
  const [minEnemyDamage, maxEnemyDamage] = enemyStats.damage;

  if (isPlayerAttack) {
    const playerDamage =
      minPlayerDamage &&
      maxPlayerDamage &&
      randomInteger(minPlayerDamage, maxPlayerDamage);
    const newEnemyHealth =
      (playerDamage &&
        enemyStats.health[0] &&
        enemyStats.health[0] - playerDamage) ||
      0;

    return {
      newHealth: newEnemyHealth,
      damage: playerDamage || "0",
    };
  } else {
    const enemyDamage =
      minEnemyDamage &&
      maxEnemyDamage &&
      randomInteger(minEnemyDamage, maxEnemyDamage);

    const newPlayerHealth =
      (enemyDamage &&
        playerStats.health[0] &&
        playerStats.health[0] - enemyDamage) ||
      0;

    return {
      newHealth: newPlayerHealth,
      damage: enemyDamage || "0",
    };
  }
};

export { Fight };

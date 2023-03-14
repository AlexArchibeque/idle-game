import { type PlayerStats, type EnemyStats } from "./gameState";

const randomInteger = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const determineCritDamage = (damage: number, critDamage: number): number => {
  return Math.ceil(damage * critDamage);
};

const Fight = (
  playerStats: PlayerStats,
  enemyStats: EnemyStats,
  isPlayerAttack: boolean
) => {
  const [minPlayerDamage, maxPlayerDamage] = playerStats.damage;
  const [minEnemyDamage, maxEnemyDamage] = enemyStats.damage;

  if (isPlayerAttack) {
    let playerDamage =
      (minPlayerDamage &&
        maxPlayerDamage &&
        randomInteger(minPlayerDamage, maxPlayerDamage)) ||
      0;

    // Crit calculations
    const isCrit = Math.random() <= playerStats.critPercentage;
    if (isCrit)
      playerDamage = determineCritDamage(playerDamage, playerStats.critDamage);

    const newEnemyHealth =
      (enemyStats.health[0] && enemyStats.health[0] - playerDamage) || 0;

    return {
      newHealth: newEnemyHealth,
      damage: playerDamage || "0",
      isCrit,
    };
  } else {
    const enemyDamage =
      (minEnemyDamage &&
        maxEnemyDamage &&
        randomInteger(minEnemyDamage, maxEnemyDamage)) ||
      0;

    const newPlayerHealth =
      (playerStats.health[0] && playerStats.health[0] - enemyDamage) || 0;

    return {
      newHealth: newPlayerHealth,
      damage: enemyDamage || "0",
    };
  }
};

export { Fight };

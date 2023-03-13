import { type PlayerStats, type EnemyStats } from "./gameState";

const randomInteger = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Fight = (playerStats: PlayerStats, enemyStats: EnemyStats) => {
  const [minPlayerDamage, maxPlayerDamage] = playerStats.damage;
  const [minEnemyDamage, maxEnemyDamage] = enemyStats.damage;

  const playerDamage =
    minPlayerDamage &&
    maxPlayerDamage &&
    randomInteger(minPlayerDamage, maxPlayerDamage);
  const enemyDamage =
    minEnemyDamage &&
    maxEnemyDamage &&
    randomInteger(minEnemyDamage, maxEnemyDamage);

  let newPlayerHealth = 0;
  let newEnemyHealth = 0;

  if (playerDamage && enemyDamage) {
    newPlayerHealth =
      (playerStats.health[0] && playerStats.health[0] - enemyDamage) || 0;
    newEnemyHealth =
      (enemyStats.health[0] && enemyStats.health[0] - playerDamage) || 0;
  }

  return {
    newPlayerHealth,
    newEnemyHealth,
    playerDamage: playerDamage || "0",
    enemyDamage: enemyDamage || "0",
  };
};

export { Fight };

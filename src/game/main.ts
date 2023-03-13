import { type PlayerStats, type EnemyStats } from "./gameState";

const Fight = (playerStats: PlayerStats, enemyStats: EnemyStats) => {
  const [minPlayerDamage, maxPlayerDamage] = playerStats?.damage;
  const [minEnemyDamage, maxEnemyDamage] = enemyStats?.damage;

  console.log("Fighting");
  return {
    newPlayerHealth: 5,
    newEnemyHealth: 32,
  };
};

export { Fight };

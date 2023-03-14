import { type NextPage } from "next";
import React from "react";
import { PlayerStatsScreen, EnemyStatsScreen } from "../../components/stats";
import { FightLogScreen } from "../../components/fightLog";
import { Fight } from "~/game/main";

import useGameStore from "~/game/gameState";

const MainGameScreen: NextPage = () => {
  const [attacks, setAttacks] = React.useState({
    enemyAttack: 0,
    playerAttack: 0,
  });
  const [fightLog, setFightLog] = React.useState<string[]>([]);

  const {
    setGameIsRunning,
    gameIsRunning,
    playerStats,
    enemyStats,
    setFightConclusion,
    setNewEnemy,
  } = useGameStore();

  const checkFightLogSize = (log: string[]): string[] => {
    if (log.length > 50) {
      return log.slice(40);
    }
    return log;
  };

  React.useEffect(() => {
    if (gameIsRunning) {
      const { newHealth: newEnemyHealth, damage: playerDamage } = Fight(
        playerStats,
        enemyStats,
        true
      );

      let fightMessage = "";
      if (newEnemyHealth <= 0) {
        // Set game to resting
        // Regen HP
        setFightConclusion(null, 0);
        fightMessage = `Player kills Enemy, handing out rewards...`;
        setNewEnemy();
        setGameIsRunning();
      } else {
        setFightConclusion(null, newEnemyHealth);
        fightMessage = `Player hits Enemy for ${playerDamage.toString()}`;
      }
      setFightLog((log: string[]) => [...checkFightLogSize(log), fightMessage]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attacks.playerAttack]);

  React.useEffect(() => {
    if (gameIsRunning) {
      const { newHealth: newPlayerHealth, damage: enemyDamage } = Fight(
        playerStats,
        enemyStats,
        false
      );

      let fightMessage = "";
      if (newPlayerHealth <= 0) {
        // Generate new enemy
        // Give experience
        // Roll for items
        setFightConclusion(newPlayerHealth, null);
        fightMessage = `Enemy kills Player, resting...`;
        setGameIsRunning();
      } else {
        setFightConclusion(newPlayerHealth, null);
        fightMessage = `Enemy hits Player for ${enemyDamage.toString()}`;
      }
      setFightLog((log: string[]) => [...checkFightLogSize(log), fightMessage]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attacks.enemyAttack]);

  React.useEffect(() => {
    if (gameIsRunning) {
      let enemyAttackSpeedInMS = enemyStats.attackSpeed * 1000;
      if (enemyStats.attackSpeed === playerStats.attackSpeed) {
        // Fix for hitting when dead.
        enemyAttackSpeedInMS = enemyStats.attackSpeed * 1020;
      }
      const playerAttackSpeedInMS = playerStats.attackSpeed * 1000;

      const enemyInterval = setInterval(
        () =>
          setAttacks((prevState) => {
            return {
              ...prevState,
              enemyAttack: prevState.enemyAttack + 1,
            };
          }),
        enemyAttackSpeedInMS
      );
      const playerInterval = setInterval(
        () =>
          setAttacks((prevState) => {
            return {
              ...prevState,
              playerAttack: prevState.playerAttack + 1,
            };
          }),
        playerAttackSpeedInMS
      );

      return () => {
        clearInterval(playerInterval);
        clearInterval(enemyInterval);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameIsRunning]);

  const startGame = () => {
    setGameIsRunning();
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <button onClick={startGame} className="bg-slate-800 text-white">
        {gameIsRunning ? "STOP THE GAME" : "START THE GAME"}
      </button>

      <div className="flex gap-4">
        <PlayerStatsScreen />
        <FightLogScreen fightLog={fightLog} />
        <EnemyStatsScreen />
      </div>
    </main>
  );
};

export default MainGameScreen;

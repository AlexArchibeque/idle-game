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

  const [enemyProgressBar, setEnemyProgressBar] = React.useState(0);
  const [playerProgressBar, setPlayerProgressBar] = React.useState(0);

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
      const {
        newHealth: newEnemyHealth,
        damage: playerDamage,
        isCrit,
      } = Fight(playerStats, enemyStats, true);

      const fightMessages: string[] = [];
      fightMessages.push(
        `Player hits Enemy for ${
          isCrit ? "CRIT! " : ""
        }${playerDamage.toString()}`
      );
      if (newEnemyHealth <= 0) {
        // Set game to resting
        // Regen HP
        setFightConclusion(null, 0);
        fightMessages.push(`Player kills Enemy, handing out rewards...`);
        setNewEnemy();
        setGameIsRunning();
        setEnemyProgressBar(0);
      } else {
        setFightConclusion(null, newEnemyHealth);
      }
      setFightLog((log: string[]) => [
        ...checkFightLogSize(log),
        ...fightMessages,
      ]);
      setPlayerProgressBar(0);
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
        setPlayerProgressBar(0);
      } else {
        setFightConclusion(newPlayerHealth, null);
        fightMessage = `Enemy hits Player for ${enemyDamage.toString()}`;
      }
      setFightLog((log: string[]) => [...checkFightLogSize(log), fightMessage]);
      setEnemyProgressBar(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attacks.enemyAttack]);

  React.useEffect(() => {
    if (gameIsRunning) {
      let enemyAttackSpeedInMS = enemyStats.attackSpeed * 1000;
      if (
        enemyStats.attackSpeed === playerStats.attackSpeed ||
        playerStats.attackSpeed % enemyStats.attackSpeed === 0
      ) {
        // Fix for over-hitting when dead.
        enemyAttackSpeedInMS = enemyStats.attackSpeed * 1020;
      }
      const playerAttackSpeedInMS = playerStats.attackSpeed * 1000;

      // Enemy attack interval and progress bar
      const enemyInterval = setInterval(() => {
        setAttacks((prevState) => {
          return {
            ...prevState,
            enemyAttack: prevState.enemyAttack + 1,
          };
        });
      }, enemyAttackSpeedInMS);

      const enemyProgressBar = setInterval(
        () =>
          setEnemyProgressBar((prevState) =>
            prevState < 100 ? prevState + 10 : prevState + 0
          ),
        Math.floor(enemyAttackSpeedInMS / 10)
      );

      // Player attack interval and progress bar
      const playerInterval = setInterval(() => {
        setAttacks((prevState) => {
          return {
            ...prevState,
            playerAttack: prevState.playerAttack + 1,
          };
        });
      }, playerAttackSpeedInMS);

      const playerProgressBar = setInterval(
        () =>
          setPlayerProgressBar((prevState) =>
            prevState < 100 ? prevState + 10 : prevState + 0
          ),
        Math.floor(playerAttackSpeedInMS / 10)
      );

      return () => {
        clearInterval(playerInterval);
        clearInterval(enemyInterval);
        clearInterval(playerProgressBar);
        clearInterval(enemyProgressBar);
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
        {gameIsRunning ? "DONT FIGHT" : "FIGHT"}
      </button>

      <div className="flex gap-4">
        <PlayerStatsScreen playerProgressBar={playerProgressBar} />
        <FightLogScreen fightLog={fightLog} />
        <EnemyStatsScreen enemyProgressBar={enemyProgressBar} />
      </div>
    </main>
  );
};

export default MainGameScreen;

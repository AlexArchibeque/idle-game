import { type NextPage } from "next";
import React from "react";
import { PlayerStatsScreen, EnemyStatsScreen } from "../../components/stats";
import { FightLogScreen } from "../../components/fightLog";
import { Fight } from "~/game/main";

import useGameStore from "~/game/gameState";

const MainGameScreen: NextPage = () => {
  const [counter, setCounter] = React.useState(0);
  const [fightLog, setFightLog] = React.useState<string[]>([]);

  const {
    setGameIsRunning,
    gameIsRunning,
    playerStats,
    enemyStats,
    setFightConclusion,
  } = useGameStore();

  const checkFightLogSize = (log: string[]): string[] => {
    if (log.length > 30) {
      return log.slice(10);
    }
    return log;
  };

  React.useEffect(() => {
    if (
      gameIsRunning &&
      playerStats !== undefined &&
      enemyStats !== undefined
    ) {
      const { newPlayerHealth, newEnemyHealth, playerDamage, enemyDamage } =
        Fight(playerStats, enemyStats);

      let fightMessage = "";
      if (newPlayerHealth <= 0) {
        // Set game to resting
        // Regen HP
        setFightConclusion(0, newEnemyHealth);
        fightMessage = `Player died, going to rest...`;
      } else if (newEnemyHealth <= 0) {
        // Generate new enemy
        // Give experience
        // Roll for items
        setFightConclusion(newPlayerHealth, 0);
        fightMessage = `Player kills Enemy, handing out rewards...`;
      } else {
        setFightConclusion(newPlayerHealth, newEnemyHealth);
        fightMessage = `Player hits for ${playerDamage.toString()}, Enemy hits for ${enemyDamage.toString()}`;
      }
      setFightLog((log: string[]) => [...checkFightLogSize(log), fightMessage]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  React.useEffect(() => {
    if (gameIsRunning) {
      const interval = setInterval(() => setCounter((val) => val + 1), 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [gameIsRunning]);

  const startGame = () => {
    setGameIsRunning();
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <button onClick={startGame} className="bg-slate-800 text-white">
        {gameIsRunning ? "STOP THE GAME" : "START THE GAME"}
      </button>
      <div className="text-white">${counter}</div>
      <div className="flex gap-4">
        <PlayerStatsScreen />
        <FightLogScreen fightLog={fightLog} />
        <EnemyStatsScreen />
      </div>
    </main>
  );
};

export default MainGameScreen;

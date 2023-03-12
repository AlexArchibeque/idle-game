import { type NextPage } from "next";
import React from "react";
import { PlayerStatsScreen, EnemyStatsScreen } from "../../components/stats";
import { Fight } from "~/game/main";

import useGameStore from "~/game/gameState";

const MainGameScreen: NextPage = () => {
  const [counter, setCounter] = React.useState(0);
  const { setGameIsRunning, gameIsRunning } = useGameStore();

  React.useEffect(() => {
    Fight();
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
      <button onClick={startGame}>
        {gameIsRunning ? "STOP THE GAME" : "START THE GAME"}
      </button>
      <div className="text-white">${counter}</div>
      <div className="flex">
        <PlayerStatsScreen />
        <EnemyStatsScreen />
      </div>
    </main>
  );
};

export default MainGameScreen;

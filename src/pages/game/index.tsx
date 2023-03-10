import { type NextPage } from "next";
import React from "react";

import { PlayerStatsScreen, EnemyStatsScreen } from "../../components/stats";

import { Fight } from "~/game/main";

export interface FightStats {
  player: {
    health: number;
    mana: number;
  };
  enemy?: {
    stength: number;
    health: number;
  };
}

const DefaultFightStats: FightStats = {
  player: {
    health: 100,
    mana: 100,
  },
};

const MainGameScreen: NextPage = () => {
  const [counter, setCounter] = React.useState(0);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [fightStats, setFightStats] = React.useState(DefaultFightStats);

  React.useEffect(() => {
    Fight(counter);
  }, [counter]);

  React.useEffect(() => {
    if (isLoaded) {
      const interval = setInterval(() => setCounter((val) => val + 1), 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isLoaded]);

  const startGame = () => {
    setIsLoaded(!isLoaded);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <button onClick={startGame}>
        {isLoaded ? "STOP THE GAME" : "START THE GAME"}
      </button>
      <div className="text-white">${counter}</div>

      <div className="flex">
        <PlayerStatsScreen fightStats={fightStats} />
        <EnemyStatsScreen fightStats={fightStats} />
      </div>
    </main>
  );
};

export default MainGameScreen;

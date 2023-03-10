import { type FightStats } from "../pages/game";

const PlayerStatsScreen = ({ fightStats }: { fightStats: FightStats }) => {
  return (
    <main className="flex h-80 w-32 flex-col bg-slate-800 p-4">
      <div>Stats:</div>
      <div>Str:</div>
      <div>Dex:</div>
      <div>Con:</div>
      <div>Health</div>
      <div>100/100</div>
      <div>Mana</div>
      <div>100/100</div>
    </main>
  );
};

const EnemyStatsScreen = ({ fightStats }: { fightStats: FightStats }) => {
  return (
    <main className="flex h-80 w-32 flex-col bg-slate-800 p-4">
      <div>MAJOR ENEMY</div>
      <div>Health</div>
      <div>100/100</div>
      <div>Mana</div>
      <div>100/100</div>
    </main>
  );
};

export { PlayerStatsScreen, EnemyStatsScreen };

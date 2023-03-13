export const FightLogScreen = ({ fightLog }: { fightLog: string[] }) => {
  return (
    <div className="flex flex-col items-center gap-1 text-white">
      FightLog
      {fightLog.length > 8
        ? fightLog.slice(fightLog.length - 8).map((message, idx) => {
            return (
              <div key={`${idx}FightLog`} className="w-full bg-slate-800 p-1">
                {message}
              </div>
            );
          })
        : fightLog.map((message, idx) => {
            return (
              <div key={`${idx}FightLog`} className="w-full bg-slate-800 p-1">
                {message}
              </div>
            );
          })}
    </div>
  );
};

import Link from "next/link";

const Classes: { [key: string]: string } = Object.freeze({
  1: "Barbarian",
  2: "Mage",
  3: "Cleric",
});

export const ClassChoiceScreen = ({ classId }: { classId: string }) => {
  const currentClass: string | undefined = Classes[classId];
  return (
    <div className="flex w-80 flex-col items-center text-white">
      <div className="h-20">{currentClass}</div>
      <div className="h-24">stat block</div>
      <Link href="/game">
        <button className="h-10 w-20 bg-slate-800 p-2">Start</button>
      </Link>
    </div>
  );
};

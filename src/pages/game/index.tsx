import { type NextPage } from "next";
import React from "react";

const GuestBook: NextPage = () => {
  const [counter, setCounter] = React.useState(0);
  const [isLoaded, setIsLoaded] = React.useState(false);

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
    <>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <button onClick={startGame}>
          {isLoaded ? "STOP THE GAME" : "START THE GAME"}
        </button>

        <div className="text-white">${counter}</div>
      </main>
    </>
  );
};

export default GuestBook;

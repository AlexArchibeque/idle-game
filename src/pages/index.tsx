import { type NextPage } from "next";
import React from "react";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
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
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        This is the main NextPage
        <button onClick={startGame}>
          {isLoaded ? "STOP THE GAME" : "START THE GAME"}
        </button>
        <div>${counter}</div>
      </main>
    </>
  );
};

export default Home;

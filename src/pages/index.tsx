import { type NextPage } from "next";
import React from "react";
import Head from "next/head";
// import Link from "next/link";
import { ClassChoiceScreen } from "~/components/classChoiceScreen";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Idle game thing</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="flex">
          {/* Mage */}
          <ClassChoiceScreen classId="2" />
          {/* Barb */}
          <ClassChoiceScreen classId="1" />
          {/* Cleric */}
          <ClassChoiceScreen classId="3" />
        </div>
      </main>
    </>
  );
};

export default Home;

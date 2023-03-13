import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface GameState {
  gameIsRunning: boolean;
  playerStats: PlayerStats;
  enemyStats: EnemyStats;
  setGameIsRunning: () => void;
  setFightConclusion: (playerHealth: number, enemyHealth: number) => void;
}

export interface PlayerStats {
  health: number[];
  mana: number[];
  str: number;
  dex: number;
  con: number;
  damage: number[];
}

export interface EnemyStats {
  health: number[];
  mana: number[];
  damage: number[];
}

const defaultPlayerStats: PlayerStats = {
  health: [100, 100],
  mana: [100, 100],
  damage: [1, 10],
  str: 10,
  dex: 10,
  con: 10,
};

const defaultEnemyStats: EnemyStats = {
  health: [20, 20],
  mana: [20, 20],
  damage: [1, 5],
};

const useGameStore = create(
  immer<GameState>((set) => ({
    gameIsRunning: false,
    playerStats: defaultPlayerStats,
    enemyStats: defaultEnemyStats,
    setGameIsRunning: () =>
      set((state: GameState) => ({ gameIsRunning: !state.gameIsRunning })),
    setFightConclusion: (playerHealth: number, enemyHealth: number) => {
      set((state: GameState) => {
        state.playerStats.health[0] = playerHealth;
        state.enemyStats.health[0] = enemyHealth;
      });
    },
  }))
);

export default useGameStore;

// import React, { useReducer, useEffect } from "react";
// import { storeReducer } from "../reducers/reducers";
// import { getInitialStore, saveStore } from "../store/store";
// import { doTick } from "../actions/middlewares";

/*
react context approach
*/
// export const GameContext = React.createContext();

// export const GameProvider = ({ children }) => {
//   const [store, dispatch] = useReducer(storeReducer, getInitialStore());
//   window._store = store;

//   useEffect(() => {
//     saveStore(store);
//   }, [store]);

//   // set up game loop
//   const [time, setTime] = React.useState(Date.now());
//   React.useEffect(() => {
//     const timer = window.setInterval(() => {
//       setTime(Date.now());
//       // setTime(prevTime => prevTime + 1);
//     }, 1000);
//     return () => {
//       window.clearInterval(timer);
//     };
//   }, []);

//   useEffect(() => {
//     const delta = (1000 - (Date.now() - time)) / 1000;
//     console.log(delta);
//     doTick({ store, dispatch }, delta);
//   }, [time]);

//   return (
//     <GameContext.Provider value={{ store, dispatch }}>
//       {children}
//     </GameContext.Provider>
//   );
// };

/*
react-tracked approach
*/

// import { createContainer } from "react-tracked";

// const useValue = () => useReducer(storeReducer, getInitialStore());
// const { Provider, useTrackedState, useUpdate } = createContainer(useValue);

// export { useTrackedState as useStore, useUpdate as useDispatch };

// export const GameProvider = ({ children }) => {
//   const StoreManager = () => {
//     const store = useTrackedState();
//     const dispatch = useUpdate();

//     // saves the store in the global window for debugging purposes
//     window._store = store;

//     // saves the store to localstorage on change
//     useEffect(() => {
//       saveStore(store);
//       // console.log("saving");
//     }, [store]);

//     const [time, setTime] = React.useState(Date.now());

//     // set up game loop
//     React.useEffect(() => {
//       const timer = window.setInterval(() => {
//         setTime(Date.now());
//       }, 1000);
//       return () => {
//         window.clearInterval(timer);
//       };
//     }, []);

//     useEffect(() => {
//       const delta = (1000 - (Date.now() - time)) / 1000;
//       doTick({ store, dispatch }, delta);
//     }, [time]); // eslint-disable-line react-hooks/exhaustive-deps

//     return null;
//   };

//   return (
//     <Provider>
//       <StoreManager />
//       {children}
//     </Provider>
//   );
// };

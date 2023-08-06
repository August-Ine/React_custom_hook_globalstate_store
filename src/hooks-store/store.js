import { useState, useEffect } from "react";

//globally shared store
let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {
  //get new setState state updating fn for each component that uses hook
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload);
    //merge states
    globalState = { ...globalState, ...newState };
    //update listeners
    for (const listener of listeners) {
      listener(globalState); //calls setState on components effectively rerendering them
    }
  };

  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState);
    }
    return () => {
      if (shouldListen) {
        listeners = listeners.filter((li) => li !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState }; //merge state slices
  }
  //merge actions
  actions = { ...actions, ...userActions };
};

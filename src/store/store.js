import React, { createContext, useReducer, ReactNode } from "react";

const initialState = {
  all: [],
  selected: "",
  onepage: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_All":
      return { ...state, all: action.payload.all };
    case "SET_SELECTED":
      return { ...state, selected: action.payload.selected };
    case "SET_ONEPAGE":
      return { ...state, onepage: action.payload.onepage };
    default:
      return state;
  }
};

export const Store = createContext({
  globalState: initialState,
  setGlobalState: (index) => null,
});

export const StoreProvider = (props) => {
  const { children } = props;
  const [globalState, setGlobalState] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ globalState, setGlobalState }}>
      {children}
    </Store.Provider>
  );
};

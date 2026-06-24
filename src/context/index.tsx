import React, { createContext, Dispatch, SetStateAction, useState } from "react";

type AppState = { counter: number };

type AppContextType = {
  state: AppState;
  setState: Dispatch<SetStateAction<AppState>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [state, setState] = useState({ counter: 0 });

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

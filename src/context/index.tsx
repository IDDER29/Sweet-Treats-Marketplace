import react, { createContext, useState } from "react";

const AppContext = createContext();

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

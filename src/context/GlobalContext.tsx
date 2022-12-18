import React from "react";

interface Context {
  logged: boolean;
  setLogged: (arg: boolean) => void;
}

const GlobalContext = React.createContext<Context>({
  logged: false,
  setLogged: () => {},
});

export default GlobalContext;

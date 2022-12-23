import React from "react";
import { ProfileType } from "../types/user";

interface Context {
  logged: boolean;
  setLogged: (arg: boolean) => void;
  userProfile: ProfileType[]
  setUserProfile: React.Dispatch<React.SetStateAction<ProfileType[]>>
}

const GlobalContext = React.createContext<Context>({
  logged: false,
  setLogged: () => {},
  userProfile: [],
  setUserProfile: () => {},
});

export default GlobalContext;

import { createContext } from "react";

export const firebaseContext = createContext(null);
export const AuthContext = createContext({
  name: "",
});

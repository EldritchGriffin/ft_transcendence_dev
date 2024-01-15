import { User} from "../(interfaces)/userInterface";
import { createContext, useContext } from "react";

export const userContext = createContext<User | undefined>(undefined)

export const useUserContext = () => {
  const context = useContext(userContext)
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider")
  }
  return context
}

//we are not going to use this so ignore it
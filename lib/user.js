import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (!user) {
      user = uuidv4();
      localStorage.setItem("user", user);
    }
    setUser(user);
  }, []);

  const value = {
    user,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserContextProvider");
  }

  const { user } = context;

  return user;
};

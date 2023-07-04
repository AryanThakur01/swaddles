import { FC, createContext, useContext, useEffect, useState } from "react";
import { IUserDocument } from "../interfaces/interface";
import { PropsWithChildren } from "react";

const AuthContext = createContext<IUserDocument | undefined>(undefined);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUserDocument>({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    address: "",
    mobile: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
    _id: "",
  });
  useEffect(() => {
    const user: string | null = localStorage.getItem("user");
    if (user) {
      const tempUser = JSON.parse(user);
      setUser(tempUser);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ ...user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserDetails = () => {
  return useContext(AuthContext);
};

export default AuthProvider;

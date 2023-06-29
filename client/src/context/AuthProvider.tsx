import { FC, createContext, useContext, useState } from "react";
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

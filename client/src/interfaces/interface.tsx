import { Dispatch, ReactNode, SetStateAction } from "react";

// ----------------------- Sign up -----------------
export interface IRegistrationData {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  address?: string;
  mobile: string;
}
export interface IUserDocument extends IRegistrationData {
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  _id?: string;
  setUser?: Dispatch<SetStateAction<IUserDocument>>;
}
export interface IUserData {
  data: {
    user: IUserDocument;
    token: string;
  };
}
// -------------------------------------------------

// --------------------- Login ---------------------
export interface ILogin {
  username: string;
  password: string;
}
// -------------------------------------------------

// ---------------------- Input Field --------------
export interface IInputFields {
  label: string;
  placeholder: string;
  isRequired?: boolean;
  uni: string;
}
// -------------------------------------------------

// --------------------- Navigation ----------------
export interface INavigationCategory {
  page: string;
  link: string;
  logo: ReactNode;
  displayTo?: "all" | "logged" | "not-logged";
  special?: boolean;
  function?: () => void;
}
export interface IAccountNavigation {
  children: ReactNode;
  activePage: string;
}
// -------------------------------------------------

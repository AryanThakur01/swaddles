import { Dispatch, SetStateAction } from "react";

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

// ---------------------- Input Field --------------
export interface IInputFields {
  label: string;
  placeholder: string;
  isRequired?: boolean;
  uni: string;
}
// -------------------------------------------------

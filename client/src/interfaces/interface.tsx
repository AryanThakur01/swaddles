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
export interface IUserDocument extends Partial<IRegistrationData> {
  password?: string;
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
  placeholder?: string;
  isRequired?: boolean;
  uni: string;
  disabled?: boolean;
  value?: string | boolean;
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
  activePage: "personal" | "manageAddress" | "panCard" | "account" | "myOrders";
}
// -------------------------------------------------

// ----------------- Account -----------------------
export interface IPersonalInfo {
  title: string;
  fields: Array<IInputFields>;
}
// -------------------------------------------------

// ----------------- Product -----------------------
export interface IProducts {
  _id: string;
  __v: number;
  product_name: string;
  product_category_tree: Array<string>;
  pid: string;
  retail_price: number;
  discounted_price: number;
  image: Array<string>;
  is_SWD_Advantage_product: boolean;
  description: string;
  product_rating: string;
  overall_rating: string;
  brand: string;
  product_specifications: string;
}
// -------------------------------------------------

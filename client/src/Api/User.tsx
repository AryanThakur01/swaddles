import axios from "axios";
import { ILogin, IRegistrationData, IUserData } from "../interfaces/interface";

export const registerUser = async (values: IRegistrationData) => {
  const {
    data: { user },
    data: { token },
  }: IUserData = await axios({
    method: "post",
    url: `${import.meta.env.VITE_BACKEND}/api/v1/auth/register`,
    data: {
      ...values,
    },
  });
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const loginUser = async (values: ILogin) => {
  const {
    data: { user },
    data: { token },
  }: IUserData = await axios({
    method: "post",
    url: `${import.meta.env.VITE_BACKEND}/api/v1/auth/login`,
    data: {
      ...values,
    },
  });
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

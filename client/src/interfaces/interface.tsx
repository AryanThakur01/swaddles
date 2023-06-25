// ----------------------- Sign up -----------------------
export interface IRegistrationData {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  address?: string;
  mobile: string;
}
// -------------------------------------------------------

// ---------------------- Input Field --------------
export interface IInputFields {
  label: string;
  placeholder: string;
  isRequired?: boolean;
  uni: string;
}
// -------------------------------------------------------

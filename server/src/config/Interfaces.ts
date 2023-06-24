export interface CustomError extends Error {
  statusCode?: number
  code?: number
}

export interface LoginData {
  username?: String
  email?: String
  password: String
}

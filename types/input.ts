export type UseFromRegisterTypes =
  | SignUpType
  | ResetPasswordType
  | LoginType
  | QueryType;

export type SignUpType = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type ResetPasswordType = {
  currentPassword: string;
  newPassword: string;
  passwordConfirm: string;
};

export type QueryType = {
  email?: string;
  message: string;
};

export type UseFromRegisterTypes =
  | SignUpType
  | ResetPasswordType
  | LoginType
  | QueryType
  | BookingType
  | ProfileSettingType;

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

export type BookingType = {
  name: string;
  email: string;
  phone: string;
  date: Date;
};

export type ProfileSettingType = {
  name: string;
  email: string;
};

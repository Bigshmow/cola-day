export default class CustomError extends Error {
  code: number;
  constructor(props, code: number) {
    super(props);
    this.code = code;
  }
}

export const Auth = {
  userNotExists() {
    return new CustomError("User doesn't exits", 1);
  },
  passwordNotMatch() {
    return new CustomError("Password is not valid", 2);
  },
  mailInUsage() {
    return new CustomError("Mail in usage", 3);
  },
  tempPassNotMatch() {
    return new CustomError("Temporary password is not valid", 4);
  },
};

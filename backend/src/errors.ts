export const Auth = {
  userNotExists() {
    return new Error("No user by that email");
  },
  passwordNotMatch() {
    return new Error("Invalid password");
  },
};

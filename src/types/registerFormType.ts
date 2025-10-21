import type { Gender } from "./gender";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: string;
  gender: Gender;
};

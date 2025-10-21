import type { Gender } from "./gender";

export type RegisterGoogleFormData = {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: Gender;
};

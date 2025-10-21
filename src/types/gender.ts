export const Gender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
} as const;

// Tipo derivado
export type Gender = (typeof Gender)[keyof typeof Gender];

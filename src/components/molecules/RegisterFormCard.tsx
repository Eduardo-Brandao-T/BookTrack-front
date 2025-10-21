import type { ReactNode } from "react";
import { LoadingButton } from "@mui/lab";

interface RegisterFormCardProps {
  title: string;
  logo?: string;
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  submitText: string;
  isSubmitting?: boolean;
}

export default function RegisterFormCard({
  title,
  logo,
  children,
  onSubmit,
  submitText,
  isSubmitting,
}: RegisterFormCardProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-cream">
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center text-center space-y-4 w-[70%] max-w-md bg-white rounded-2xl p-6 shadow-md"
      >
        <div className="flex items-center justify-center space-x-2">
          {logo && (
            <img src={logo} alt="Logo" className="w-8 sm:w-10 object-contain" />
          )}
          <h1 className="text-2xl sm:text-3xl font-semibold text-brown">
            {title}
          </h1>
        </div>

        {children}

        <LoadingButton
          type="submit"
          loading={isSubmitting}
          fullWidth
          className="!bg-dark-green hover:!bg-matcha !text-white !rounded-2xl !py-3 !font-semibold transition"
        >
          {submitText}
        </LoadingButton>
      </form>
    </div>
  );
}

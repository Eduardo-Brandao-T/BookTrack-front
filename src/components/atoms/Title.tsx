interface TitleProps {
  children: React.ReactNode
}

export default function Title({ children }: TitleProps) {
  return (
    <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-brown leading-tight text-center">
      {children}
    </h1>
  )
}

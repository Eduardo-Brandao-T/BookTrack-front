import Navbar from "@/components/molecules/Navbar";

function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-beryl-green text-dark-green text-2xl font-semibold">
      {/* Navbar responsiva */}
      <Navbar />

      {/* Conteúdo principal */}
      <div className="text-center">📚 Página Inicial</div>
    </div>
  );
}

export default Home;

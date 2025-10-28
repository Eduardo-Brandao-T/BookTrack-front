import { Home, BarChart2, User, Search, LogOut } from "lucide-react";
import folhaImg from "@/assets/folha.png";
import { useAuth } from "@/app/hooks/useAuth";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Estante", icon: <Home />, path: "/" },
  { label: "Estatísticas", icon: <BarChart2 />, path: "/estatisticas" },
  { label: "Perfil", icon: <User />, path: "/perfil" },
  { label: "Pesquisar", icon: <Search />, path: "/pesquisar" },
];

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <>
      {/* Tira superior (desktop e mobile) */}
      <header className="fixed top-0 left-0 md:left-20 right-0 bg-beryl-green border-b border-white flex items-center justify-between px-4 py-2 z-40 transition-all">
        <div className="flex items-center gap-2">
          <img src={folhaImg} alt="Folha" className="w-6 h-6" />
          <h1 className="text-green-900 font-semibold text-lg">BookTrack</h1>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-1 text-red-700 hover:text-red-500 font-medium text-sm cursor-pointer"
        >
          <LogOut size={18} />
          Sair
        </button>
      </header>

      {/* Navbar lateral (desktop) */}
      <aside className="hidden md:flex flex-col justify-around items-center bg-white text-parsley-green w-20 py-6 fixed left-0 top-0 bottom-0 z-50">
        <div className="flex flex-col items-center gap-8 mt-16">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              path={item.path}
            />
          ))}
        </div>
      </aside>

      {/* Navbar inferior (mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white text-parsley-green flex justify-around items-center py-2 rounded-t-2xl z-40">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            path={item.path}
          />
        ))}
      </nav>
    </>
  );
}

function NavItem({
  icon,
  label,
  path,
}: {
  icon: React.ReactNode;
  label: string;
  path: string;
}) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex flex-col items-center text-sm gap-1 py-1 ${
          isActive
            ? "border-b-2 border-matcha text-matcha"
            : "hover:text-matcha transition-colors duration-200"
        }`
      }
    >
      {icon}
      <span className="text-xs">{label}</span>
    </NavLink>
  );
}

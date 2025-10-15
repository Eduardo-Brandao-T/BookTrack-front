import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="w-full bg-dark-green text-white px-6 py-3 flex justify-between items-center">
      <h1 className="font-bold text-lg">BookTrack</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/login" className="hover:underline">Login</Link>
      </div>
    </nav>
  )
}

export default Navbar

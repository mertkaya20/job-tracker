import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth-slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-100 px-4 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="text-lg font-bold text-gray-900">
          Job<span className="text-primary">Tracker</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/dashboard"
            className="text-sm text-gray-500 hover:text-primary transition-colors font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/applications"
            className="text-sm text-gray-500 hover:text-primary transition-colors font-medium"
          >
            Applications
          </Link>
        </div>

        {/* Desktop User + Logout */}
        <div className="hidden md:flex items-center gap-4">
          <span className="text-sm text-gray-600 font-medium">
            {user?.username}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 cursor-pointer p-1"
        >
          <span
            className={`block w-5 h-0.5 bg-gray-700 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-700 transition-all ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-700 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4 flex flex-col gap-4">
          <Link
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="text-sm text-gray-500 hover:text-primary transition-colors font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/applications"
            onClick={() => setMenuOpen(false)}
            className="text-sm text-gray-500 hover:text-primary transition-colors font-medium"
          >
            Applications
          </Link>
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-sm text-gray-600 font-medium">
              {user?.username}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

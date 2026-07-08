import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth-slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="text-xl font-bold text-gray-900">
          Job<span className="text-primary">Tracker</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
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

        {/* User + Logout */}
        <div className="flex items-center gap-4">
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
    </nav>
  );
};

export default Navbar;

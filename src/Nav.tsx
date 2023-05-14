import { NavLink } from "react-router-dom";
import { useUserContext } from "./context/UserContext";

export function Nav() {
  const user = useUserContext();

  return (
    <nav>
      {Object.entries(user).length > 0 && <p>Hello {user.name}</p>}
      <ul>
        <li><NavLink to="/" className={({ isActive, isPending }) => isActive ? "font-bold text-lg" : ""}>Menu</NavLink></li>
        { user.isAdmin && <li><NavLink className={({ isActive, isPending }) => isActive ? "font-bold text-lg" : ""}
          to="/manage" >Manage Menu</NavLink></li>}
      </ul>
    </nav>
  );
}

import { NavLink } from "react-router";

export function Nav() {
    return(
        <nav>
            <div className="page-links">
                {/* Create an <a> tag that routes to the provided string value */}
                <NavLink to="/" end>
                    Home
                </NavLink>
                <NavLink to="/UserGames">
                    User Games
                </NavLink>
                <NavLink to="/reviews">
                    Reviews
                </NavLink>
                <NavLink to="/friends">
                    Friends
                </NavLink>
            </div>
        </nav>
    );
}
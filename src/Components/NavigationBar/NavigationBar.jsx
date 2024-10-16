import { NavLink } from "react-router-dom";
import styles from "./NavigationBar.module.css";
import DarkLightTheme from "../DarkLightTheme/DarkLightTheme";


function Navigation({ theme, toggleTheme }) {
  return (
    <nav className={styles.navContainer}>
      <NavLink
        to="/home"
        className={({ isActive }) => isActive ? `${styles.navItem} ${styles.activeNavItem}`: styles.navItem }
      >
        Home
      </NavLink>
      <NavLink
        to="/todo"
        className={({ isActive }) => isActive ? `${styles.navItem} ${styles.activeNavItem}`: styles.navItem }
      >
        Todo List
      </NavLink>
      <DarkLightTheme theme={theme} toggleTheme={toggleTheme} />
    </nav>
  );
}

export default Navigation;

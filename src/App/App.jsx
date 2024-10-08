import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import TodoContainer from "../Components/TodoContainer/TodoContainer";
import Home from "../Components/Home/Home";
import styles from "./App.module.css";

function Navigation() {
  return (
    <nav className={styles.navContainer}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? `${styles.navItem} ${styles.activeNavItem}`
            : styles.navItem
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/todo"
        className={({ isActive }) =>
          isActive
            ? `${styles.navItem} ${styles.activeNavItem}`
            : styles.navItem
        }
      >
        Todo List
      </NavLink>
    </nav>
  );
}

function App() {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<TodoContainer tableName={import.meta.env.VITE_TABLE_NAME} />}
          />
        </Routes>
      </BrowserRouter>
      </section>
    </main>
  );
}

export default App;

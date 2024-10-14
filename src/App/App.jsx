import { BrowserRouter, Routes, Route, NavLink, Navigate, } from "react-router-dom";
import TodoContainer from "../Components/Todo/TodoContainer/TodoContainer";
import Home from "../Components/Home/Home";
import PageNotFound from "../Components/PageNotFound/PageNotFound";
import Footer from "../Components/Footer/Footer";
import styles from "./App.module.css";

function Navigation() {
  return (
    <nav className={styles.navContainer}>
      <NavLink
        to="/home"
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
          { <Navigation />}
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/todo"
              element={
                <TodoContainer tableName={import.meta.env.VITE_TABLE_NAME} />
              }
            />
            <Route path="/*" element={<Navigate to="/404" />} />
            <Route path="/404" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </section>
      <Footer/>
    </main>
  );
}

export default App;

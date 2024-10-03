import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import TodoContainer from "./Components/TodoContainer";
import styles from "./App.module.css"

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
        to="/new"
        className={({ isActive }) =>
          isActive
            ? `${styles.navItem} ${styles.activeNavItem}`
            : styles.navItem
        }
      >
        New Todo
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
              <Route path="/" element={<TodoContainer tableName="TODO LIST" />} />
              <Route
                path="/new"
                element={
                  <div className={styles.newTodo}>
                    <h1 className={styles.heading}>New Todo List</h1>
                  </div>
                }
              />
            </Routes>
          </BrowserRouter>
        </section>
      </main>
    );
  }
  
export default App;

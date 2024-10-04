import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import TodoContainer from "../Components/TodoContainer/TodoContainer";
import Home from "../Components/Home/Home";
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
      {/* <section className={styles.section}> */}
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route
            path="/todo"
            element={<TodoContainer tableName="TODO LIST" />}
            // element={
            //   <div className={styles.newTodo}>
            //     <h1 className={styles.heading}>New Todo List</h1>
            //   </div>
            // }
          />
        </Routes>
      </BrowserRouter>
      {/* </section> */}
    </main>
  );
}

export default App;

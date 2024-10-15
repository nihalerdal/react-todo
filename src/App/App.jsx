import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";
import { useState, useEffect} from "react";
import TodoContainer from "../Components/Todo/TodoContainer/TodoContainer";
import Home from "../Components/Home/Home";
import PageNotFound from "../Components/PageNotFound/PageNotFound";
import Footer from "../Components/Footer/Footer";
import Navigation from "../Components/NavigationBar/NavigationBar";
import styles from "./App.module.css";


function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <BrowserRouter>
          {<Navigation theme={theme} toggleTheme={toggleTheme} />}
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
      <Footer />
    </main>
  );
}

export default App;

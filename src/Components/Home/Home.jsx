import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/home") {
      document.body.style.backgroundImage =
        "url('./pexels-shvets-production-9743075.jpg')";
      document.body.style.backgroundSize = "contain";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "bottom";
    } else {
      // If it's not the home page, reset the background image
      document.body.style.backgroundImage = ""; // Reset the background
    }
    return () => {
      document.body.style.backgroundImage = ""; // Reset background on unmount
    };
  }, [location.pathname]);

  return <div className={styles.homeContainer}></div>;
}

export default Home;

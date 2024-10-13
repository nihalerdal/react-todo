import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {

  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      // If it's not the home page, reset the background image
      document.body.style.backgroundImage = ""; // Reset the background
    }
    return () => {
      document.body.style.backgroundImage = ""; // Reset background on unmount
    };
  }, [location.pathname]);

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeHeader}>
        Keep Your Life Organized: Create and Manage Tasks Effortlessly!
      </h1>
      <p className={styles.homeText}>
        Your journey to a more organized life starts here! With our task
        management app, you can efficiently handle your to-dos and ensure
        nothing falls through the cracks.
      </p>
    </div>
  );
}

export default Home;

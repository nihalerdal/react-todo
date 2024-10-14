import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import styles from "./PageNotFound.module.css";

function PageNotFound() {
  //changing background for 404 page
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/404") {
      document.body.style.backgroundImage =
        "url('./pexels-shvets-production-9743075.jpg')";
      document.body.style.backgroundSize = "contain";
      document.body.style.backgroundPosition = "bottom";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.opacity = "0.4";
    }
  }, [location.pathname]);

  return (
    <div className={styles.NotFound}>
      <div className={styles.Error}>Oops! Page not found</div>
    </div>
  );
}
  
export default PageNotFound;

import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import styles from "./DarkLightTheme.module.css";
import PropTypes from "prop-types";

const DarkLightTheme = ({ theme, toggleTheme }) => {
  return (
    <div className={styles.themeButton}>
      {theme === "light" ? (
        <MdDarkMode type="button" title="dark" onClick={toggleTheme}>
        </MdDarkMode>
      ) : (
        <MdLightMode type="button" title="light" onClick={toggleTheme}>
        </MdLightMode>
      )}
    </div>
  );
};

DarkLightTheme.propTypes = {
  theme: PropTypes.string,
  toggleTheme: PropTypes.func,
};
export default DarkLightTheme;

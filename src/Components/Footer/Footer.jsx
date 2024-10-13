import { FaGithub } from "react-icons/fa";
import styles from "./Footer.module.css";

function Footer() {
  //current year
  const today = new Date();
  const thisYear = today.getFullYear();

  return (
    <footer className={styles.Footer}>
      
        <p className={styles.CopyRight}>
          © Nihal Erdal {thisYear} All rights reserved.
        </p>
        <a href="https://github.com/nihalerdal" target="_blank" rel="noopener">
          <FaGithub className={styles.GitHubLogo} />
        </a>
     
    </footer>
  );
}

export default Footer;

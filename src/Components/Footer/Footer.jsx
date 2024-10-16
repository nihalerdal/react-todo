import { FaGithub } from "react-icons/fa";
import styles from "./Footer.module.css";

function Footer() {
  //current year
  const today = new Date();
  const thisYear = today.getFullYear();

  return (
    <footer className={styles.footer}>
      
        <p className={styles.copyRight}>
          © Nihal Erdal {thisYear} All rights reserved.
        </p>
        <a href="https://github.com/nihalerdal" target="_blank" rel="noopener">
          <FaGithub className={styles.gitHubLogo} />
        </a>
     
    </footer>
  );
}

export default Footer;

import styles from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>
            HirePro
          </Link>

          <ul className={styles.navLinks}>
            <li><Link href="#">Jobs</Link></li>
            <li><Link href="#">Companies</Link></li>
            <li><Link href="#">Salaries</Link></li>
            <li><Link href="#">Resources</Link></li>
          </ul>
        </div>

        <div className={styles.right}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Search jobs, companies..."
            />
          </div>

          {/* <Link href="#" className={styles.login}>
            Login
          </Link> */}

          <Link href="/choose" className={styles.signup}>
            Sign Up
          </Link>

          <Link href="#" className={styles.postJob}>
            Post a Job
          </Link>
        </div>

      </div>
    </nav>
  );
}

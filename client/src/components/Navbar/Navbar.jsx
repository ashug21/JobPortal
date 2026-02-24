"use client";

import styles from "./Navbar.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {

  const [user, setUser] = useState(null);
  const [role , setRole] = useState("");
  const [recruiterid , setrecruiterId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/recruiter/me", {
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) return null;
        return res.json();
      })
      .then(data => {
        if (data && data.success) {
          setUser(data.user);
          setRole(data.user.role);


          setrecruiterId(data.user.id);
          
        }
      })
      .catch(() => {});
  }, []);


// function consoledata(){
//   console.log(user);
//   console.log(role);
//   console.log(recruiterid);
// }

// consoledata();

  const handleLogout = async () => {
    await fetch("http://localhost:4000/recruiter/logout", {
      method: "POST",
      credentials: "include"
    });
    setUser(null);
  };


  if (user && role === "recruiter") {
    return (
      <nav className={styles.navbar}>
      <div className={styles.container}>
        
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>
            HirePro
          </Link>

          <ul className={styles.navLinks}>
            <li><Link href="/jobpost">Post a Job</Link></li>
            <li><Link href="/jobs">Jobs</Link></li>
            <li><Link href="/myjobs">My Jobs</Link></li>
            <li><Link href="/candidatesApplied">Candidates Applied</Link></li>
            
          </ul>
        </div>

        <div className={styles.right}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Search jobs, companies..."
            />
          </div>

          <Link onClick={handleLogout} href="/choose" className={styles.signup}>
          Logout
          </Link>

          <Link href="/post-job" className={styles.postJob}>
            My Profile
          </Link>

         
        </div>

      </div>
    </nav>
    );
  }

  if (user && role === "talent") {
    return (
      <nav className={styles.navbar}>
      <div className={styles.container}>
        
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>
            HirePro
          </Link>

          <ul className={styles.navLinks}>
            <li><Link href="/jobs">Jobs</Link></li>
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

          <Link onClick={handleLogout} href="/choose" className={styles.signup}>
          Logout
          </Link>

          <Link href="/post-job" className={styles.postJob}>
            My Profile
          </Link>

         
        </div>

      </div>
    </nav>
    );
  }

  else{
    return (
      <nav className={styles.navbar}>
        <div className={styles.container}>
          
          <div className={styles.left}>
            <Link href="/" className={styles.logo}>
              HirePro
            </Link>
  
            <ul className={styles.navLinks}>
              <li><Link href="/jobs">Jobs</Link></li>
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
  
            
  
            <Link href="/choose" className={styles.signup}>
              Sign Up
            </Link>
  
            <Link href="/login" className={styles.postJob}>
              Login
            </Link>
          </div>
  
        </div>
      </nav>
    );
  }
 
}

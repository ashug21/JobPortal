import React from "react";
import styles from "./Choose.module.css";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";

const Choose = () => {
  return (
    <div>
      <Navbar/>
 <section className={styles.wrapper}>
      <div className={styles.container}>

        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image
              src="/Signup/Employer.png"
              alt="Job Seekers"
              fill
              className={styles.image}
            />
          </div>
          <h2 className={styles.title}>For Job Seekers</h2>
          <p className={styles.description}>
            Discover thousands of opportunities and connect with top companies to advance your career.
          </p>
          <Link href="/talent" className={styles.primaryBtn}>
            Sign Up as Job Seeker
          </Link>
        </div>

        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image
              src="/Signup/Recruiter.png"
              alt="Employers"
              fill
              className={styles.image}
            />
          </div>
          <h2 className={styles.title}>For Recruiters</h2>
          <p className={styles.description}>
            Post jobs, manage applicants, and hire the best talent efficiently with our platform.
          </p>
          <Link href="/recruiter" className={styles.secondaryBtn}>
          Sign Up as Recruiter
          </Link>
        </div>

      </div>
    </section>
    </div>
   
  );
};

export default Choose;

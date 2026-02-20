"use client"

import React, { useState } from "react";
import styles from "./recruiter.module.css";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/navigation";

const RecruiterSignup = () => {

  const [fullname , setFullName] = useState("");
  const [companyname , setCompanyName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [phone , setPhone] = useState("");


  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const res = await fetch("http://localhost:4000/recruiter/register" , {
        method : "POST",
        headers :  {
          "Content-Type": "application/json",
          },
          body : JSON.stringify({
            full_name : fullname,
            company_name : companyname,
            phone,
            email , 
            password
          }),
          credentials: "include",  
      });
      const data = await res.json();

      if(!res.ok){
        throw new Error(data.error || "Signup failed");
      }

      alert("Recruiter created successfully");

      setFullName(""),
      setEmail("");
      setPassword("");
      setPhone("");
      setCompanyName("");

      router.replace("/login");

    } catch (error) {
      console.log(error.message);
    }

  }

  return (
    <div>
      <Navbar/>
<section className={styles.wrapper}>
      <div className={styles.container}>
        
        <div className={styles.left}>
          <h1 className={styles.heading}>Hire Top Talent Faster</h1>
          <p className={styles.subtext}>
            Create your recruiter account to post jobs, manage applicants, and
            streamline your hiring process.
          </p>
        </div>

        <div className={styles.right}>
          <div className={styles.card}>
            <h2 className={styles.title}>Recruiter Sign Up</h2>

            <form className={styles.form} onSubmit={handleSubmit}>

            <div className={styles.inputGroup}>
                <label>Full Name</label>
                <input onChange={(e) => setFullName(e.target.value)} value={fullname} type="text" placeholder="Enter company name" />
              </div>


              <div className={styles.inputGroup}>
                <label>Company Name</label>
                <input  onChange={(e) => setCompanyName(e.target.value)} value={companyname} type="text" placeholder="Enter company name" />
              </div>

              <div className={styles.inputGroup}>
                <label>Work Email</label>
                <input  onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter work email" />
              </div>

              <div className={styles.inputGroup}>
                <label>Phone</label>
                <input  onChange={(e) => setPhone(e.target.value)} value={phone} type="text" placeholder="Enter Phone" />
              </div>


              <div className={styles.inputGroup}>
                <label>Password</label>
                <input  onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Create password" />
              </div>

              <div className={styles.inputGroup}>
                <label>Confirm Password</label>
                <input type="password" placeholder="Confirm password" />
              </div>

              <button type="submit" className={styles.primaryBtn}>
                Create Account
              </button>
            </form>

            <p className={styles.footerText}>
              Already have an account?{" "}
              <Link href="#">Login</Link>
            </p>
          </div>
        </div>

      </div>
    </section>
    </div>
    
  );
};

export default RecruiterSignup;

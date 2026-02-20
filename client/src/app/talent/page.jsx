"use client"

import React, { useState } from "react";
import styles from "./Talent.module.css";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/navigation";

const Talent = () => {

   const [full_name , setFullName] = useState("");
    const [phone , setPhone] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
  
      const router = useRouter();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        
        const res = await fetch("http://localhost:4000/talent/register" , {
          method : "POST",
          headers :  {
            "Content-Type": "application/json",
            },
            body : JSON.stringify({
              full_name,
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

        alert("Talent created successfully");

        setFullName(""),
        setEmail("");
        setPassword("");
        setPhone("");


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
          <h1 className={styles.heading}>Start Your Career Journey</h1>
          <p className={styles.subtext}>
            Create your talent account to apply for jobs, connect with top companies, 
            and unlock better career opportunities.
          </p>
        </div>

        <div className={styles.right}>
          <div className={styles.card}>
            <h2 className={styles.title}>Talent Sign Up</h2>

            <form className={styles.form} onSubmit={handleSubmit}>

              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>First Name</label>
                  <input onChange={(e) => setFullName(e.target.value)} value={full_name}  type="text" placeholder="Enter first name" />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Email Address</label>
                <input onChange={(e) => setEmail(e.target.value)} value={email}  type="email" placeholder="Enter email" />
              </div>

              <div className={styles.inputGroup}>
                <label>Phone Number</label>
                <input onChange={(e) => setPhone(e.target.value)} value={phone}  type="text" placeholder="Enter phone number" />
              </div>

              <div className={styles.inputGroup}>
                <label>Password</label>
                <input onChange={(e) => setPassword(e.target.value)} value={password}  type="password" placeholder="Create password" />
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
              Already have an account? <Link href="#">Login</Link>
            </p>

          </div>
        </div>

      </div>
    </section>
    </div>
    
  );
};

export default Talent;

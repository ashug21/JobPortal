"use client";

import Navbar from '@/components/Navbar/Navbar'
import React, { useState } from 'react'
import styles from './login.module.css'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const page = () => {

const router = useRouter();
  const [email , setEmail] = useState("");
  const[password , setPassword] = useState("");

  const [step , setStep] = useState(1);

  const loginRecruiter = async (e) => {
      e.preventDefault();

      try {
        
        const res = await fetch("http://localhost:4000/recruiter/login" ,{
          method : "POST",
          headers :  {
            "Content-Type": "application/json",
            },
            credentials: "include",
          body : JSON.stringify({
            email,
            password
          })
        });
  
        const data = await res.json();
  
        if(!res.ok || !data.success){
          throw new Error("Login Failed");
        }

        router.replace("/")

      } catch (error) {
        console.log(error);
      }
  }
  

  const loginTalent = async (e) => {
    e.preventDefault();

    try {
      
      const res = await fetch("http://localhost:4000/talent/login" ,{
        method : "POST",
        headers :  {
          "Content-Type": "application/json",
          },
          credentials: "include",
        body : JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

      if(!res.ok || !data.success){
        throw new Error("Login Failed");
      }

      router.replace("/")

    } catch (error) {
      console.log(error);
    }
} 

function changeStep (){

  if(step === 1){
    setStep(2);
  }
  else{
    setStep(1);
  }
}

  return (
    <div>
      <Navbar />

      <button className={styles.toggleButton} onClick={changeStep}>Switch To {step === 1 ? "Recruiter" : "Candidate"} Login?</button>

     {step === 1  &&  ( <section className={styles.wrapper}>
        <div className={styles.card}>
          <h2 className={styles.title}>Login as Talent</h2>

          <form className={styles.form} onSubmit={loginTalent}>
            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter your email" />
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Enter your password" />
            </div>

            <button type="submit" className={styles.primaryBtn}>
              Login
            </button>
          </form>

          <p className={styles.footerText}>
            Don’t have an account? <Link href={"/talent"}>Sign Up</Link>
          </p>
        </div>
      </section>
      )}


{step === 2  &&  ( <section className={styles.wrapper}>
        <div className={styles.card}>
          <h2 className={styles.title}>Login to Recruiter Account  </h2>

          <form className={styles.form} onSubmit={loginRecruiter}>
            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter your email" />
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Enter your password" />
            </div>

            <button type="submit" className={styles.primaryBtn}>
              Login
            </button>
          </form>

          <p className={styles.footerText}>
            Don’t have an account? <Link href={"/recruiter"}>Sign Up</Link>
          </p>
        </div>
      </section>
      )}

    </div>
  )
}

export default page

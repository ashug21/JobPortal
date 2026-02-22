"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import styles from "./jobpage.module.css";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  const fetchJob = async () => {
    try {
      const res = await fetch(`http://localhost:4200/jobs/single/${id}`, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch job");
      }

      const data = await res.json();
      setJob(data.jobs || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) fetchJob();
  }, [id]);

  if (!job){
    return(
        <>
        <Navbar/>
        <h2 className={styles.loading}>Loading Details...</h2></>    
    )
  }



  return (
    <div>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>{job.title}</h1>
          <h3 className={styles.company}>{job.company}</h3>

          <div className={styles.meta}>
            <span>📍 {job.location}</span>
            <span>💼 {job.jobtype}</span>
            <span>🏠 {job.workmode}</span>
            <span>⏳ {job.experiencerequired}</span>
            <span>💰 ₹{job.salary}</span>
          </div>

          <div className={styles.section}>
            <h4>Description</h4>
            <p>{job.description}</p>
          </div>

          <div className={styles.section}>
            <h4>Required Skills</h4>
            <div className={styles.skills}>
              {job.skills?.split(",").map((skill, index) => (
                <span key={index} className={styles.skillTag}>
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>

          <button className={styles.applyButton}>
            Confirm Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
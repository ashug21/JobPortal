"use client";
import Navbar from "@/components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import styles from "./myjob.module.css";

const MyJobs = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [recruiterid, setrecruiterId] = useState(null);

  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch("http://localhost:4000/recruiter/me", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (data && data.success) {
          setUser(data.user);
          setRole(data.user.role);
          setrecruiterId(data.user.id);
        }
      })
      .catch(() => {});
  }, []);

  const getRecruiterJob = async () => {
    try {
      const res = await fetch(
        "http://localhost:4200/jobs/recruiterjobs",
        {
          method: "GET",
          credentials: "include",
        }
      );
  
      const data = await res.json();
  
      if (!res.ok || !data.success) {
        console.log(data.message);
        return;
      }
  
      setJobs(data.jobs);
      setTotal(data.total);
  
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getRecruiterJob();
  }, []);

  if (role === "talent") {
    return (
      <div>
        <Navbar />
        <div className={styles.centerBox}>
          <h2>Talent can't Post or See Jobs</h2>
        </div>
      </div>
    );
  }

  if (role === "recruiter") {
    return (
      <div className={styles.page}>
        <Navbar />

        <div className={styles.container}>
          <div className={styles.header}>
            <h1>My Job Listings</h1>
            <span className={styles.total}>
              {total} {total === 1 ? "Job" : "Jobs"}
            </span>
          </div>

          <div className={styles.jobGrid}>
            {jobs.length === 0 ? (
              <div className={styles.emptyState}>
                <h3>Loading...</h3>
                <p>Start posting opportunities to attract candidates.</p>
              </div>
            ) : (
              jobs.map((job) => (
                <div key={job.id} className={styles.jobCard}>
                  <div className={styles.cardTop}>
                    <h2>{job.title}</h2>
                    <span className={styles.company}>
                      {job.company}
                    </span>
                  </div>

                  <div className={styles.meta}>
                    <span>{job.location}</span>
                    <span>{job.jobtype}</span>
                    <span>{job.workmode}</span>
                  </div>

                  <p className={styles.description}>
                    {job.description}
                  </p>

                  <div className={styles.cardBottom}>
                    <span className={styles.salary}>
                      ₹ {job.salary}
                    </span>
                    <button className={styles.viewBtn}>
                      View Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default MyJobs;
"use client";

import Navbar from "@/components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import styles from "./candidates.module.css";

const CandidatesApplied = () => {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const res = await fetch(
        "http://localhost:4200/jobs/candidateapplications",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return;
      }

      setApplications(data.applications);
    } 
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div>
        <Navbar />
 <div className={styles.wrapper}>
    

      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Applications Dashboard</h1>
          <p>Manage and review candidate applications</p>
        </div>

        <div className={styles.grid}>
          {applications.length === 0 ? (
            <div className={styles.empty}>
              No applications received yet.
            </div>
          ) : (
            applications.map((app) => (
              <div key={app.application_id} className={styles.card}>
                <div className={styles.cardTop}>
                  <div>
                    <h2>{app.full_name}</h2>
                    <span>{app.email}</span>
                  </div>
                  <div className={styles.status}>
                    {app.status}
                  </div>
                </div>

                <div className={styles.details}>
                  <p><strong>Location:</strong> {app.phone}</p>
                  {/* <p><strong>Experience:</strong> {app.experience_years} years</p>
                  <p><strong>Skills:</strong> {app.skills}</p> */}
                </div>

                <div className={styles.footer}>
                  <button className={styles.shortlist}>Shortlist</button>
                  <button className={styles.reject}>Reject</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    </div>
   
  );
};

export default CandidatesApplied;
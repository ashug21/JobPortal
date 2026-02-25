"use client";

import Navbar from "@/components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import styles from "./jobs.module.css";
import { useRouter } from "next/navigation";

const Jobs = () => {
  const router = useRouter();

  const [data, setData] = useState([]);

  const fetchallJobs = async () => {
    try {
      const res = await fetch("http://localhost:4200/jobs/fetch", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const response = await res.json();
      setData(response.Jobs || response || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchallJobs();
  }, []);

  return (
    <div>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.heading}>Find Your Next Opportunity</h1>

          {data.length === 0 ? (
            <p className={styles.empty}>Loading Jobs...</p>
          ) : (
            <div className={styles.list} >
              {data.map((job) => (
                <div key={job.id} className={styles.card}    onClick={() => router.push(`/jobs/${job.id}`)}>
                  <div className={styles.titleRow}>
                    <div>
                      <h2 className={styles.title}>{job.title}</h2>
                      <p className={styles.company}>{job.company}</p>
                    </div>

                    <span className={styles.salary}>₹{job.salary}</span>
                  </div>

                  <div className={styles.meta}>
                    <span>{job.location}</span>
                    <span>{job.jobtype}</span>
                    <span>{job.workmode}</span>
                    <span>{job.experiencerequired}</span>
                  </div>

                  <p className={styles.description}>{job.description}</p>

                  <div className={styles.skills}>
                    {job.skills?.split(",").map((skill, index) => (
                      <span key={index} className={styles.skillTag}>
                        {skill.trim()}
                      </span>
                    ))}
                  </div>

                  <div className={styles.bottomRow}>
                    <div></div>
                    <button
                      className={styles.applyButton}
                      onClick={() => router.push(`/jobs/${job.id}`)}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;

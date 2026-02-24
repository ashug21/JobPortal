"use client";

import Navbar from "@/components/Navbar/Navbar";
import React, { useState } from "react";
import styles from "./JobPost.module.css";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [jobtype, setJobType] = useState("Full-time");
  const [workmode, setWorkMode] = useState("Onsite");
  const [salary, setSalary] = useState("");
  const [experienceRequired, setExperienceRequired] = useState("");
  const [skills, setSkills] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4200/jobs/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          company,
          location,
          jobtype,
          workmode,
          salary,
          experienceRequired,
          skills,
        }),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data);
        throw new Error(data.message || "Server Error");
      }

      alert("Job Added");

      setTitle("");
      setDescription(""),
        setCompany(""),
        setLocation(""),
        setJobType(""),
        setWorkMode(""),
        setSalary(""),
        setExperienceRequired(""),
        setSkills("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.heading}>Post a New Job</h1>
          <p className={styles.subHeading}>
            Fill in the details below to publish your job listing.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label>Job Title</label>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type="text"
                  placeholder="e.g. Full Stack Developer"
                />
              </div>

              <div className={styles.field}>
                <label>Company Name</label>
                <input
                  onChange={(e) => setCompany(e.target.value)}
                  value={company}
                  type="text"
                  placeholder="e.g. Buyverse"
                />
              </div>
              <div className={styles.field}>
                <label>Location</label>
                <input
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                  type="text"
                  placeholder="e.g. New Delhi, India"
                />
              </div>

              <div className={styles.field}>
                <label>Job Type</label>
                <select
                  onChange={(e) => setJobType(e.target.value)}
                  value={jobtype}
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Contract</option>
                </select>
              </div>

              <div className={styles.field}>
                <label>Work Mode</label>
                <select
                  onChange={(e) => setWorkMode(e.target.value)}
                  value={workmode}
                >
                  <option>Onsite</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                </select>
              </div>

              <div className={styles.field}>
                <label>Salary (Annual)</label>
                <input
                  onChange={(e) => setSalary(e.target.value)}
                  value={salary}
                  type="text"
                  placeholder="e.g. 1200000"
                />
              </div>

              <div className={styles.field}>
                <label>Experience Required</label>
                <input
                  onChange={(e) => setExperienceRequired(e.target.value)}
                  value={experienceRequired}
                  type="text"
                  placeholder="e.g. 2+ years"
                />
              </div>
            </div>

            <div className={styles.fieldFull}>
              <label>Skills (comma separated)</label>
              <input
                onChange={(e) => setSkills(e.target.value)}
                value={skills}
                type="text"
                placeholder="React, Node.js, PostgreSQL"
              />
            </div>

            <div className={styles.fieldFull}>
              <label>Job Description</label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                rows="6"
                placeholder="Describe responsibilities, requirements, and expectations..."
              />
            </div>

            <button type="submit" className={styles.button}>
              Publish Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;

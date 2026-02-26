"use client";

import Navbar from "@/components/Navbar/Navbar";
import styles from "./EditTalentProfile.module.css";
import { useEffect, useState } from "react";

const EditTalentProfile = () => {

  const [user, setUser] = useState({
    full_name: "",
    phone: "",
    age: "",
    gender: "",
    location: "",
    headline: "",
    bio: "",
    skills: "",
    experience: "",
    education: "",
    certifications: "",
    languages: "",
    linkedin: "",
    github: "",
    portfolio: ""
  });

  async function getTalentDetails() {
    try {
      const res = await fetch("http://localhost:4000/talent/talentDetails", {
        method: "GET",
        credentials: "include"
      });

      if (!res.ok) {
        throw new Error("Internal Server Error");
      }

      const data = await res.json();

      setUser((prev) => ({
        ...prev,
        ...data.talent
      }));

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTalentDetails();
  }, []);

 

  return (
    <>
      <Navbar />

      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h1 className={styles.title}>Edit Profile</h1>
          <p className={styles.subtitle}>
            Keep your profile updated to attract better opportunities.
          </p>

          <form className={styles.form}>

            <div className={styles.section}>
              <h2>Basic Information</h2>

              <div className={styles.grid2}>
                <div className={styles.inputGroup}>
                  <label>Full Name</label>
                  <input type="text" value={user.full_name} disabled />
                </div>

                <div className={styles.inputGroup}>
                  <label>Phone Number</label>
                  <input type="text" value={user.phone} disabled />
                </div>

                <div className={styles.inputGroup}>
                  <label>Age</label>
                  <input
                    type="number"
                    value={user.age}
                    onChange={(e) => setUser({ ...user, age: e.target.value })}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Gender</label>
                  <select
                    value={user.gender}
                    onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className={styles.inputGroupFull}>
                  <label>Location</label>
                  <input
                    type="text"
                    value={user.location}
                    onChange={(e) => setUser({ ...user, location: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2>Professional Details</h2>

              <div className={styles.inputGroupFull}>
                <label>Headline</label>
                <input
                  type="text"
                  value={user.headline}
                  onChange={(e) => setUser({ ...user, headline: e.target.value })}
                />
              </div>

              <div className={styles.inputGroupFull}>
                <label>Bio</label>
                <textarea
                  rows="4"
                  value={user.bio}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                />
              </div>

              <div className={styles.inputGroupFull}>
                <label>Skills</label>
                <textarea
                  rows="3"
                  value={user.skills}
                  onChange={(e) => setUser({ ...user, skills: e.target.value })}
                />
              </div>

              <div className={styles.inputGroupFull}>
                <label>Experience</label>
                <textarea
                  rows="4"
                  value={user.experience}
                  onChange={(e) => setUser({ ...user, experience: e.target.value })}
                />
              </div>

              <div className={styles.inputGroupFull}>
                <label>Education</label>
                <textarea
                  rows="3"
                  value={user.education}
                  onChange={(e) => setUser({ ...user, education: e.target.value })}
                />
              </div>

              <div className={styles.inputGroupFull}>
                <label>Certifications</label>
                <textarea
                  rows="2"
                  value={user.certifications}
                  onChange={(e) => setUser({ ...user, certifications: e.target.value })}
                />
              </div>

              <div className={styles.inputGroupFull}>
                <label>Languages</label>
                <input
                  type="text"
                  value={user.languages}
                  onChange={(e) => setUser({ ...user, languages: e.target.value })}
                />
              </div>
            </div>

            <div className={styles.section}>
              <h2>Online Presence</h2>

              <div className={styles.grid2}>
                <div className={styles.inputGroup}>
                  <label>LinkedIn URL</label>
                  <input
                    type="text"
                    value={user.linkedin}
                    onChange={(e) => setUser({ ...user, linkedin: e.target.value })}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>GitHub URL</label>
                  <input
                    type="text"
                    value={user.github}
                    onChange={(e) => setUser({ ...user, github: e.target.value })}
                  />
                </div>

                <div className={styles.inputGroupFull}>
                  <label>Portfolio URL</label>
                  <input
                    type="text"
                    value={user.portfolio}
                    onChange={(e) => setUser({ ...user, portfolio: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className={styles.buttonWrapper}>
              <button type="submit" className={styles.saveBtn}>
                Save Changes
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default EditTalentProfile;
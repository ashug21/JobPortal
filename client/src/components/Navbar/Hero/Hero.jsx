import styles from './Hero.module.css'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        
        <div className={styles.left}>
          <h1>
            Kickstart Your <span>Career Journey</span>
          </h1>

          <p>
            Discover internships and jobs from verified recruiters
            across top companies.
          </p>

          <div className={styles.searchBox}>
            <input type="text" placeholder="Search job title..." />
            <input type="text" placeholder="Location" />
            <button>Search</button>
          </div>

          <div className={styles.stats}>
            <div>
              <h3>25K+</h3>
              <span>Active Jobs</span>
            </div>
            <div>
              <h3>3K+</h3>
              <span>Companies</span>
            </div>
            <div>
              <h3>15K+</h3>
              <span>Hired</span>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <Image
            src="/hero3.png"
            alt="Job Search Illustration"
            width={520}
            height={520}
            priority
          />
        </div>

      </div>
    </section>
  )
}
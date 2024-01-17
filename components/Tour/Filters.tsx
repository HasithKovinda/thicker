import Star from "@/UI/StarMatri";
import styles from "./Filters.module.css";
import StarMatrix from "@/UI/StarMatri";

export default function Filters() {
  return (
    <aside className={styles.container}>
      <div className={styles.heading}>
        <h2>Filters</h2>
        <img src="/assert/icons/filter.svg" alt="" />
      </div>
      <div className={styles.options}>
        <div>
          <p>Price</p>
          <span>$10 - $1000</span>
        </div>
        <input
          type="range"
          name="price"
          id="price"
          minLength={100}
          maxLength={1000}
          className={styles.range}
        />
      </div>
      <div className={styles.options}>
        <div>
          <p>Duration</p>
          <span>1 Day - 10 Days</span>
        </div>
        <input
          type="range"
          name="price"
          id="price"
          minLength={1}
          maxLength={10}
          className={styles.range}
        />
      </div>
      <div className={styles.options}>
        <div>
          <p>Group Size</p>
          <span>5 Persons - 40 Persons</span>
        </div>
        <input
          type="range"
          name="price"
          id="price"
          minLength={1}
          maxLength={10}
          className={styles.range}
        />
      </div>
      <div className={styles.options}>
        <p>Difficulty</p>
        <select name="cars" id="cars" className={styles.select}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="difficult">Difficult</option>
        </select>
      </div>
      <div className={styles.options}>
        <p>Customer Reviews</p>
        <StarMatrix rows={5} />
      </div>
      <div className={styles.options}>
        <button className={`btn ${styles.clear}`}>Clear Filters</button>
      </div>
    </aside>
  );
}

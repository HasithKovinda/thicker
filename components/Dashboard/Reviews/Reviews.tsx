import StarRating from "@/components/Rating/StarRating";
import styles from "./Reviews.module.css";

export default function Reviews() {
  return (
    <section className={styles.reviews}>
      <div>
        <select name="cars" id="cars">
          <option value="all">The Park Camper 😍</option>
          <option value="easy">The City Wanderer 😒</option>
          <option value="medium">The Snow Adventurer 😊</option>
          <option value="hard">The Sea Explorer 😘</option>
        </select>
      </div>
      <div>
        <StarRating />
      </div>
      <form>
        <textarea rows={10} cols={70}></textarea>
      </form>
    </section>
  );
}

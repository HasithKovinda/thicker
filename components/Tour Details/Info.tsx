import Image from "next/image";
import styles from "./Info.module.css";

type InfoProps = {
  duration: number;
  groupSize: number;
  startLocation: string;
  difficulty: string;
  price: number;
  title: string;
};

export default function Info({
  duration,
  difficulty,
  startLocation,
  groupSize,
  price,
  title,
}: InfoProps) {
  return (
    <section className={`section-center ${styles.section}`}>
      <div className={styles.heading}>
        <h2>{title}</h2>
        <p>
          <span>${price}</span>per person
        </p>
      </div>
      <article className={styles.article}>
        <div>
          <div className={styles["img-container"]}>
            <Image
              src="/assert/icons/duration.svg"
              height={50}
              width={50}
              alt="duration"
            />
          </div>
          <div>
            <p>Duration</p>
            <span>{duration} Days</span>
          </div>
          <div className={styles.line}></div>
        </div>
        <div>
          <div className={styles["img-container"]}>
            <Image
              src="/assert/icons/speedometer.svg"
              height={50}
              width={50}
              alt="speedometer"
            />
          </div>
          <div>
            <p>Difficulty</p>
            <span>{difficulty}</span>
          </div>
          <div className={styles.line}></div>
        </div>
        <div>
          <div className={styles["img-container"]}>
            <Image
              src="/assert/icons/team-group.svg"
              height={50}
              width={50}
              alt="team-group"
            />
          </div>
          <div>
            <p>Group Size</p>
            <span>{groupSize} Person</span>
          </div>
          <div className={styles.line}></div>
        </div>
        <div>
          <div className={styles["img-container"]}>
            <Image
              src="/assert/icons/icon-1.svg"
              height={50}
              width={50}
              alt="location"
            />
          </div>
          <div>
            <p>Location</p>
            <span>{startLocation}</span>
          </div>
        </div>
      </article>
    </section>
  );
}

import styles from "./BackgroundVideo.module.css";

export default function BackgroundVideo() {
  return (
    <section className={styles.section}>
      <video className={styles.video} autoPlay loop>
        <source src="/video/cover-video.mp4" />
        Your Browser is not supported
      </video>
      <div className={styles.heading}>
        <svg viewBox="0 0 1320 300" className={styles.svg}>
          <text x="50%" y="50%" dy=".35em" text-anchor="middle">
            Unveiling the Story Behind Your Next Adventure
          </text>
        </svg>
      </div>
    </section>
  );
}

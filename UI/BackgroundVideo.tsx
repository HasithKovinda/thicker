import styles from "./BackgroundVideo.module.css";

export default function BackgroundVideo() {
  return (
    <section className={styles.section}>
      <video className={styles.video} autoPlay loop>
        <source src="/video/cover-video.mp4" />
        Your Browser is not supported
      </video>
      <div className={styles.heading}>
        <h1>Well Come to Our tour page</h1>
      </div>
    </section>
  );
}

"use client";

import { FormEvent, useRef } from "react";
import styles from "./NewLetter.module.css";
import { BiEnvelope, BiLogoTelegram } from "react-icons/bi";
import toast from "react-hot-toast";

function NewLetter() {
  const ref = useRef<HTMLInputElement>(null);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (ref.current?.value) {
      toast.success("News letter subscribe successfully");
      ref.current.value = "";
      return;
    }
    toast.error("Please add your email address");
  }
  return (
    <section className={`section-center ${styles.section}`}>
      <h1>Subscribe Our News Letter</h1>
      <div className="underline"></div>
      <article className={styles.article}>
        <div className={styles.content}>
          <span>Newsletter</span>
          <h2>SUBSCRIBE NOW</h2>
          <p>
            Fight School has specialized in martial arts since 1986 and has one
            of the most innovative programs in the nation.
          </p>
          <div className={styles.form}>
            <form className={styles.container} onSubmit={handleSubmit}>
              <BiEnvelope className={styles.email} />
              <input type="email" placeholder="Your Email Address" ref={ref} />
              <button className={`btn ${styles.submit}`}>
                SubsCribe
                <span>
                  <BiLogoTelegram />
                </span>
              </button>
            </form>
          </div>
        </div>
      </article>
    </section>
  );
}

export default NewLetter;

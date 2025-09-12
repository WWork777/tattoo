"use client";
import styles from "./Leaders.module.scss";

export const Leaders = () => {
  return (
    <div className="container">
      <h2>Руководители</h2>
      <div className={styles.leaders}>
        <div className={styles.facts_top}>
          <div className={styles.fact}>
            <p>Антон Драйцев, основатель Soprano</p>
          </div>
          <div className={styles.fact}>
            <p>По гороскопу телец</p>
          </div>
        </div>
        <div className={styles.text_block}>
          <img
            src="/images/leaders/leader1.jpg"
            alt="Руководитель 1"
            className={styles.image_left}
          />
          <p>
            - Валера, помнишь, когда тебе было хорошо, я сделал тебе тату?{" "}
            <br></br>
            <br></br>- Нет, Антон, ты сначала сделал тату, а потом мне было
            хорошо
          </p>
          <img
            src="/images/leaders/leader2.jpg"
            alt="Руководитель 2"
            className={styles.image_right}
          />
        </div>
        <div className={styles.facts_bottom}>
          <div className={styles.fact}>
            <p>Валера Авдеев, директор Soprano</p>
          </div>
          <div className={styles.fact}>
            <p>По гороскопу овен</p>
          </div>
        </div>
      </div>
    </div>
  );
};

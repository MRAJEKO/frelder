import styles from "./scenes.module.scss";

const Scenes = () => {
  return (
    <section className={styles.cards}>
      <h1 className={styles.title}>Scenes</h1>
      <div className={styles["scenes-cards"]}>
        <div className={styles.scene}>
          <p>Lichten laag</p>
        </div>
        <div className={styles.scene}>
          <p>Lichten middelmatig</p>
        </div>
        <div className={styles.scene}>
          <p>Lichten hoog</p>
        </div>
        <div className={styles.scene}>
          <p>TV Kijken</p>
        </div>
      </div>
    </section>
  );
};

export default Scenes;

import styles from "./cards.module.scss";

const CardState = () => {
  return (
    <div className={`${styles.card} ${styles["card-state"]} ${styles.enabled}`}>
      <p></p>
    </div>
  );
};

export default CardState;

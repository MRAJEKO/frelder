import styles from "./cardData.module.scss";

interface IProps {
  name: string;
  value: string | number;
  unit: string;
}

const CardDataInfo = ({ name, value, unit }: IProps) => {
  return (
    <div className={styles.info}>
      <p className={styles.name}>{name}</p>
      <p className={styles.value}>
        {value}
        {unit}
      </p>
    </div>
  );
};

export default CardDataInfo;

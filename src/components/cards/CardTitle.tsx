import styles from "./cards.module.scss";

interface IProps {
  topic: string;
  children?: any;
  color?: string;
}

const CardTitle = ({ topic, children, color }: IProps) => {
  return (
    <div className={styles["card-title"]}>
      <p style={{ color: color ?? "" }} className={styles["room-name"]}>
        {topic.split("/")[0]}
      </p>
      <p style={{ color: color ?? "" }} className={styles["device-name"]}>
        {topic.split("/")[1]}
      </p>
      {children}
    </div>
  );
};

export default CardTitle;
``;

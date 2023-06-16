import styles from "./cards.module.scss";

interface IProps {
  setDevices: (newState: string) => void;
  title: string;
  enabled: boolean;
  masterValue: string;
}

const masterSwitch = ({ setDevices, title, enabled, masterValue }: IProps) => {
  return (
    <div
      className={`${styles.card} ${styles["card-big"]} ${enabled ? styles.enabled : ""}`}
      onClick={() => {
        setDevices(masterValue);
      }}
    >
      <p>{title}</p>
    </div>
  );
};

export default masterSwitch;

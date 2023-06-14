import styles from "./cards.module.scss";

interface IProps {
  setDevices: (enabled: boolean) => void;
  title: string;
  enabled: boolean;
  masterValue: boolean;
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

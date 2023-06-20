import styles from "./cards.module.scss";

interface IProps {
  name: string;
  enabled: boolean;
  forceValue: boolean;
  onPress: (value: boolean) => void;
}

const ToggleButton = ({ name, onPress, forceValue, enabled }: IProps) => {
  return (
    <p className={`${styles.card} ${enabled ? styles.enabled : ""}`} onClick={() => onPress(forceValue)}>
      {name}
    </p>
  );
};

export default ToggleButton;

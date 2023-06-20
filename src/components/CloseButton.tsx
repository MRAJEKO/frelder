import styles from "./closeButton.module.scss";

interface IProps {
  onPress: () => void;
}

const CloseButton = ({ onPress }: IProps) => {
  return (
    <div onClick={onPress} className={styles.container}>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
    </div>
  );
};

export default CloseButton;

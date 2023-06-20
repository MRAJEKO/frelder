import styles from "./cards.module.scss";
import { setDevice } from "../../functions/setApi";
import { ICustomDevice } from "./Cards";
import { IFeatureProperty } from "../../types/devices";
import CardTitle from "./CardTitle";

interface IProps {
  topic: string;
  deviceInfo: ICustomDevice;
  onChange: (topic: string, key: IFeatureProperty, value: number | string | boolean) => void;
}

const CardState = ({ topic, deviceInfo, onChange }: IProps) => {
  return (
    <div
      className={`${styles.card} ${styles["card-state"]} ${deviceInfo?.state === "ON" ? styles.enabled : ""}`}
      onClick={() => {
        const newState = deviceInfo?.state === "ON" ? "OFF" : "ON";
        setDevice(topic, { state: newState });
        onChange(topic, "state", newState);
      }}
    >
      <CardTitle topic={topic} />
    </div>
  );
};

export default CardState;

import styles from "./cards.module.scss";
import { setDevice } from "../../functions/setApi";
import { ICustomDevice } from "./Cards";
import { IFeatureProperty } from "../../types/devices";
import CardTitle from "./CardTitle";
import BrightnessSlider from "./BrightnessSlider";

interface IProps {
  topic: string;
  deviceInfo: ICustomDevice;
  onChange: (topic: string, key: IFeatureProperty, value: number | string | boolean) => void;
}

const CardBrightness = ({ topic, deviceInfo, onChange }: IProps) => {
  if (!deviceInfo?.brightness) return null;

  return (
    <div
      className={`${styles.card} ${styles["card-brightness"]} ${deviceInfo?.state === "ON" ? styles.enabled : ""}`}
      onClick={() => {
        const feature = { state: deviceInfo?.state === "ON" ? "OFF" : "ON" };
        setDevice(topic, feature);
        onChange(topic, "state", deviceInfo?.state === "ON" ? "OFF" : "ON");
      }}
    >
      <CardTitle topic={topic} />
      <div className={styles.options}>
        <BrightnessSlider topic={topic} deviceInfo={deviceInfo} />
      </div>
    </div>
  );
};

export default CardBrightness;

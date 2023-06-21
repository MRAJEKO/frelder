import { contrastColor } from "../../functions/colorConvertion";
import { ICustomDevice } from "../Dashboard";
import CardTitle from "./CardTitle";
import styles from "./cards.module.scss";

interface IProps {
  topic: string;
  deviceInfo: ICustomDevice;
  openColor: (topic: string, deviceInfo: ICustomDevice) => void;
}

const CardPopout = ({ topic, deviceInfo, openColor }: IProps) => {
  console.log(deviceInfo.color);

  const color = deviceInfo.color ?? "#ffffff";

  return (
    <div
      style={{
        background: deviceInfo.state === "ON" ? color : "",
      }}
      className={`${styles.card} ${styles["card-popout"]}`}
      onClick={() => {
        openColor(topic, deviceInfo);
      }}
    >
      <CardTitle topic={topic} color={deviceInfo.state === "ON" ? contrastColor(color ?? "#ffffff") : undefined} />
      <div className={styles["sub-info"]}>
        <p
          style={{ color: deviceInfo.state === "ON" ? contrastColor(color ?? "#ffffff") : undefined }}
          className={styles["small-text"]}
        >
          Druk voor meer opties
        </p>
        {deviceInfo.brightnessSetting && (
          <p className={styles.brightness}>{Math.round(((deviceInfo?.brightness || 0) / 254) * 100)}%</p>
        )}
      </div>
    </div>
  );
};

export default CardPopout;

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
  // console.log(deviceInfo);

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
      <p
        style={{ color: deviceInfo.state === "ON" ? contrastColor(color ?? "#ffffff") : undefined }}
        className={styles["small-text"]}
      >
        Druk voor meer opties
      </p>
    </div>
  );
};

export default CardPopout;

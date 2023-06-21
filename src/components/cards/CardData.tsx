import { ICustomDevice } from "../Dashboard";
import CardDataInfo from "./CardDataInfo";
import CardTitle from "./CardTitle";
import styles from "./cardData.module.scss";

interface IProps {
  topic: string;
  deviceInfo: ICustomDevice;
}

const CardData = ({ topic, deviceInfo }: IProps) => {
  if (deviceInfo === null) return null;

  return (
    <div className={styles.card}>
      <CardTitle topic={topic} />
      {Object.keys(deviceInfo).map((key) => {
        switch (key) {
          case "temperature":
            return (
              deviceInfo.temperatureSetting && (
                <CardDataInfo
                  name="Temperatuur"
                  value={deviceInfo[key] ?? "Onbekend"}
                  unit={deviceInfo[key] ? " °C" : ""}
                />
              )
            );
          case "humidity":
            return (
              deviceInfo.humiditySetting && (
                <CardDataInfo
                  name="Luchtvochtigheid"
                  value={deviceInfo[key] ?? "Onbekend"}
                  unit={deviceInfo[key] ? "%" : ""}
                />
              )
            );
          case "pressure":
            return (
              deviceInfo.pressureSetting && (
                <CardDataInfo
                  name="Luchtdruk"
                  value={deviceInfo[key] ?? "Onbekend"}
                  unit={deviceInfo[key] ? " hPa" : ""}
                />
              )
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default CardData;

import { useState } from "react";

import styles from "./cards.module.scss";
import { Slider } from "@mui/material";
import { setDevice } from "../../functions/setApi";
import { ICustomDevice } from "./Cards";
import { IFeatureProperty } from "../../types/devices";

interface IProps {
  topic: string;
  deviceInfo: ICustomDevice;
  onChange: (topic: string, key: IFeatureProperty, value: number | string | boolean) => void;
}

const CardBrightness = ({ topic, deviceInfo, onChange }: IProps) => {
  console.log(deviceInfo?.brightness);
  const [brightness, setBrightness] = useState<number>(((deviceInfo?.brightness || 0) / 254) * 100);

  const changeBrightness = (_e: any, value: number | number[]) => {
    const feature = { brightness: (typeof value == "number" ? value : brightness) * 2.54 };
    setDevice(topic, feature);
  };

  return (
    <div
      className={`${styles.card} ${styles["card-brightness"]} ${deviceInfo?.state === "ON" ? styles.enabled : ""}`}
      onClick={() => {
        const feature = { state: deviceInfo?.state === "ON" ? "OFF" : "ON" };
        setDevice(topic, feature);
        onChange(topic, "state", deviceInfo?.state === "ON" ? "OFF" : "ON");
      }}
    >
      <div className={styles["card-title"]}>
        <p>{topic}</p>
      </div>
      <div className={styles.line}></div>
      <div className={styles.options}>
        <div className={styles["option-title"]}>
          <p>Helderheid | {brightness}%</p>
        </div>
        <Slider
          color={deviceInfo?.state === "ON" ? "secondary" : "primary"}
          value={brightness}
          onChange={(_e, value) => setBrightness(typeof value == "number" ? value : brightness)}
          onChangeCommitted={changeBrightness}
          onClick={(e) => (deviceInfo?.state === "ON" ? e.stopPropagation() : null)}
        ></Slider>
      </div>
    </div>
  );
};

export default CardBrightness;

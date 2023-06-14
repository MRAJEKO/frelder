import { useState } from "react";

import styles from "./cards.module.scss";
import { Slider } from "@mui/material";
import { setDevice } from "../../functions/setApi";
import { ICustomDevice } from "./Cards";
import { IFeatureProperty } from "../../types/devices";

interface IProps {
  topic: string;
  title: string;
  optionsTitle: string;
  deviceInfo: ICustomDevice;
  onChange: (topic: string, key: IFeatureProperty, value: number | string | boolean) => void;
}

const CardBrightness = ({ topic, title, optionsTitle, deviceInfo, onChange }: IProps) => {
  const [brightness, setBrightness] = useState<number>(deviceInfo?.brightness || 0);

  const changeBrightness = (_e: any, value: number | number[]) => {
    const feature = { brightness: typeof value == "number" ? value : brightness };
    setDevice(topic, feature);
  };

  return (
    <div
      className={`${styles.card} ${styles["card-brightness"]} ${deviceInfo?.state ? styles.enabled : ""}`}
      onClick={() => onChange(topic, "state", !deviceInfo?.state ?? false)}
    >
      <div className={styles["card-title"]}>
        <p>{title}</p>
      </div>
      <div className={styles.line}></div>
      <div className={styles.options}>
        <div className={styles["option-title"]}>
          <p>
            {optionsTitle} | {brightness}%
          </p>
        </div>
        <Slider
          color={deviceInfo?.state ? "secondary" : "primary"}
          value={brightness}
          onChange={(_e, value) => setBrightness(typeof value == "number" ? value : brightness)}
          onChangeCommitted={changeBrightness}
          onClick={(e) => (deviceInfo?.state ? e.stopPropagation() : null)}
        ></Slider>
      </div>
    </div>
  );
};

export default CardBrightness;

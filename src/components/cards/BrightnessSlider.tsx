import { useState } from "react";
import styles from "./cards.module.scss";
import { ICustomDevice } from "./Cards";
import { setDevice } from "../../functions/setApi";
import { Slider } from "@mui/material";

interface IProps {
  topic: string;
  deviceInfo: ICustomDevice;
  forceColor?: string;
}

const BrightnessSlider = ({ topic, deviceInfo, forceColor }: IProps) => {
  const [brightness, setBrightness] = useState<number>(Math.round(((deviceInfo?.brightness || 0) / 254) * 100));

  const changeBrightness = (_e: any, value: number | number[]) => {
    const feature = { brightness: (typeof value == "number" ? value : brightness) * 2.54 };
    setDevice(topic, feature);
  };

  return (
    <div>
      <div className={styles["option-title"]}>
        <p>Helderheid | {brightness}%</p>
      </div>
      <Slider
        color={
          forceColor === "primary" || forceColor === "secondary"
            ? forceColor
            : deviceInfo?.state === "ON"
            ? "secondary"
            : "primary"
        }
        value={brightness}
        onChange={(_e, value) => setBrightness(typeof value == "number" ? value : brightness)}
        onChangeCommitted={changeBrightness}
        onClick={(e) => (deviceInfo?.state === "ON" ? e.stopPropagation() : null)}
      ></Slider>
    </div>
  );
};

export default BrightnessSlider;

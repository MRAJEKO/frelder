import { useState, useEffect } from "react";
import styles from "./cards.module.scss";
import { ICustomDevice } from "../Dashboard";
import { setDevice } from "../../functions/setApi";
import { Slider } from "@mui/material";

interface IProps {
  topic: string;
  deviceInfo: ICustomDevice;
  forceColor?: string;
  changeBrightness: (value: number) => void;
}

const BrightnessSlider = ({ topic, deviceInfo, forceColor, changeBrightness }: IProps) => {
  const [brightness, setBrightness] = useState<number>(Math.round(((deviceInfo?.brightness || 0) / 254) * 100));

  useEffect(() => {
    setBrightness(Math.round(((deviceInfo?.brightness || 0) / 254) * 100));
  }, [deviceInfo]);

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
        onChangeCommitted={(_e: any, value: number | number[]) => {
          setDevice(topic, { brightness: (typeof value == "number" ? value : brightness) * 2.54 });
          changeBrightness(typeof value == "number" ? value : brightness);
        }}
        onClick={(e) => (deviceInfo?.state === "ON" ? e.stopPropagation() : null)}
      ></Slider>
    </div>
  );
};

export default BrightnessSlider;

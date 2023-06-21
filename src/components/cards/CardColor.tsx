import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";

import CloseButton from "../CloseButton";
import BrightnessSlider from "./BrightnessSlider";
import CardTitle from "./CardTitle";
import { IColorPopoutState } from "./Cards";

import styles from "./colorCard.module.scss";
import ToggleButton from "./ToggleButton";
import { setDevice } from "../../functions/setApi";

interface IProps {
  info: IColorPopoutState;
  setColorPopout: (info: IColorPopoutState) => void;
}

const CardColor = ({ info, setColorPopout }: IProps) => {
  const [enabled, setEnabled] = useState<boolean>(info.deviceInfo?.state === "ON" ?? false);

  const [brightness, setBrightness] = useState<number>(Math.round(((info.deviceInfo?.brightness || 0) / 254) * 100));

  const [color, setColor] = useState<string>(info.deviceInfo?.color ?? "#ffffff");

  useEffect(() => {
    setEnabled(info.deviceInfo?.state === "ON" ?? false);
    setBrightness(Math.round(((info.deviceInfo?.brightness || 0) / 254) * 100));
  }, [info]);

  useEffect(() => {
    const feature = { state: enabled ? "ON" : "OFF" };
    setDevice(info.topic, feature);
  }, [enabled]);

  const handleClose = () => {
    setColorPopout({
      ...info,
      deviceInfo: {
        ...info.deviceInfo,
        color: color,
        brightness: Math.round(brightness * 2.54),
        state: enabled ? "ON" : "OFF" ?? "#ffffff",
      },
      shown: false,
    } as IColorPopoutState);
  };

  return (
    <div className={styles.card} style={{ top: info.shown ? "50%" : "150%" }}>
      <CardTitle topic={info.topic ?? ""} children={<CloseButton onPress={handleClose} />} />
      {info.deviceInfo?.brightnessSetting ? (
        <div className={styles["toggle-container"]}>
          <ToggleButton name="Aan" forceValue={true} enabled={enabled} onPress={(value) => setEnabled(value)} />
          <ToggleButton name="Uit" forceValue={false} enabled={!enabled} onPress={(value) => setEnabled(value)} />
        </div>
      ) : null}
      {info.deviceInfo?.brightnessSetting ? (
        <BrightnessSlider
          changeBrightness={(brightness: number) => setBrightness(brightness)}
          topic={info.topic ?? ""}
          deviceInfo={info.deviceInfo}
          forceColor={"primary"}
        />
      ) : null}

      <div className={styles["color-container"]}>
        <SketchPicker
          styles={{
            default: { picker: { background: "none", width: "100%", padding: "0", boxShadow: "none" } },
          }}
          color={color}
          onChange={(color) => setColor(color.hex)}
          onChangeComplete={(color) => setDevice(info.topic, { color: color.hex })}
        />
      </div>
    </div>
  );
};

export default CardColor;

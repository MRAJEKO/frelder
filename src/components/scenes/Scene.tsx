import { ICustomDevice, ICustomDevices } from "../Dashboard";
import styles from "./scenes.module.scss";

interface IProps {
  name: string;
  devices: ICustomDevices;
  onSceneChange: any;
  brightness: number;
}

const Scene = ({ name, devices, onSceneChange, brightness }: IProps) => {
  const sceneActive = Object.values(devices)
    .filter((device) => device.brightnessSetting && device.stateSetting)
    .every((deviceValue: ICustomDevice) => deviceValue.brightness === brightness && deviceValue.state === "ON");

  // console.log(sceneActive);

  return (
    <div onClick={() => onSceneChange(brightness)} className={`${styles.scene} ${sceneActive ? styles.enabled : ""}`}>
      <p>{name}</p>
    </div>
  );
};

export default Scene;

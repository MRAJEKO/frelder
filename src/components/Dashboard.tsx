import styles from "./dashboard.module.scss";

import Cards from "./cards/Cards";
import Scenes from "./scenes/Scenes";
import { useState } from "react";

export interface ICustomDevices {
  [key: string]: ICustomDevice;
}

export interface ICustomDevice {
  [key: string]: boolean | number | string | null;
  brightnessSetting: boolean;
  brightness: number | null;
  colorSetting: boolean;
  color: string | null;
  stateSetting: boolean;
  state: string | null;
  initialStates: boolean;
}

const Dashboard = () => {
  const [devices, setDevices] = useState<ICustomDevices>({
    "woonkamer/schemerlamp": {
      brightnessSetting: true,
      brightness: 76,
      colorSetting: true,
      color: null,
      stateSetting: true,
      state: "ON",
      initialStates: false,
    },
  });

  console.log(devices);

  return (
    <>
      <div className={styles.container}>
        <Scenes devices={devices} setDevices={setDevices} />
        <div className={styles["big-line"]}></div>
        <Cards devices={devices} setDevices={setDevices} />
      </div>
    </>
  );
};

export default Dashboard;

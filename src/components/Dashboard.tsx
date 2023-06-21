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
  temperatureSetting: boolean;
  temperature: number | null;
  humiditySetting: boolean;
  humidity: number | null;
  pressureSetting: boolean;
  pressure: number | null;
  initialStates: boolean;
}

const Dashboard = () => {
  const [devices, setDevices] = useState<ICustomDevices>({});

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

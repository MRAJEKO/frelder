import { useState } from "react";
import CardBrightness from "./CardBrightness";
import MasterSwitch from "./MasterSwitch";
import styles from "./cards.module.scss";

export interface ICustomDevices {
  [key: string]: ICustomDevice;
}

export interface ICustomDevice {
  title: string;
  brightnessSetting: boolean;
  brightness: number;
  colorSetting: boolean;
  color: string | null;
  stateSetting: boolean;
  state: boolean;
}

const Cards = () => {
  const [devices, setDevices] = useState<ICustomDevices>({
    "woonkamer/schemerlamp": {
      title: "Schemerlamp",
      brightnessSetting: true,
      brightness: 50,
      colorSetting: false,
      color: null,
      stateSetting: true,
      state: false,
    },
    "woonkamer/keuken": {
      title: "Keuken",
      brightnessSetting: true,
      brightness: 50,
      colorSetting: false,
      color: null,
      stateSetting: true,
      state: false,
    },
  });

  const masterSwitchDevices = (enabled: boolean) => {
    const newDevices = Object.keys(devices)
      .map((key) => {
        return { [key]: { ...devices[key], state: enabled } };
      })
      .reduce((acc, cur) => ({ ...acc, ...cur }), {});

    setDevices({ ...newDevices });
  };

  const changeValue = (topic: string, key: string, value: number | string | boolean) => {
    const feature = { [key]: value };
    setDevices({ ...devices, [topic]: { ...devices[topic], ...feature } });
  };

  const allOn = Object.values(devices).every((device) => device.state);

  const allOff = Object.values(devices).every((device) => !device.state);

  return (
    <section className={styles.cards}>
      <div className={styles.lights}>
        <MasterSwitch setDevices={masterSwitchDevices} title="Alles Aan" enabled={allOn} masterValue={true} />
        <MasterSwitch setDevices={masterSwitchDevices} title="Alles Uit" enabled={allOff} masterValue={false} />
        <CardBrightness
          topic="woonkamer/schemerlamp"
          title={"woonkamer/schemerlamp"}
          optionsTitle="Brightness"
          deviceInfo={devices["woonkamer/schemerlamp"]}
          onChange={changeValue}
        />
        <CardBrightness
          topic="woonkamer/keuken"
          title="woonkamer/keuken"
          optionsTitle="Brightness"
          deviceInfo={devices["woonkamer/keuken"]}
          onChange={changeValue}
        />
      </div>
      <div className={styles.sensors}></div>
    </section>
  );
};

export default Cards;

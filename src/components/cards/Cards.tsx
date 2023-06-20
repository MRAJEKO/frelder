import { useCallback, useState } from "react";
import CardBrightness from "./CardBrightness";
import MasterSwitch from "./MasterSwitch";
import styles from "./cards.module.scss";
import useData from "../../hooks/useData";
import { IDevice, IDevices, IPayload } from "../../types/devices";
import hasProperty from "../../functions/hasProperty";
import CardState from "./CardState";
import { setDevice } from "../../functions/setApi";
import CardPopout from "./CardPopout";
import CardColor from "./CardColor";
import { convertXYToHexColor } from "../../functions/colorConvertion";

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

export interface IColorPopoutState {
  topic: string | null;
  deviceInfo: ICustomDevice | null;
  shown: boolean;
}

const Cards = () => {
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

  const [colorPopout, setColorPopout] = useState<IColorPopoutState>({
    topic: null,
    deviceInfo: null,
    shown: false,
  });

  interface IReceiveData {
    topic: string;
    payload: IDevices | IPayload;
  }

  const handleDevicesReceiveData = (payload: IDevices) => {
    return payload
      .map((device: IDevice) => ({
        [device.friendly_name]: {
          brightnessSetting: hasProperty(device, "brightness"),
          brightness: null,
          colorSetting: hasProperty(device, "color"),
          color: null,
          stateSetting: hasProperty(device, "state"),
          state: null,
          initialStates: false,
        },
      }))
      .reduce((acc: ICustomDevices, cur: ICustomDevices) => ({ ...acc, ...cur }), {});
  };

  const handleReceiveData = useCallback(({ topic, payload }: IReceiveData) => {
    console.log(topic, payload);

    setDevices((prevDevices: ICustomDevices) => {
      console.log(prevDevices);
      if (topic === "devices" && Object.keys(prevDevices).length === 0) {
        const newDevices: ICustomDevices = handleDevicesReceiveData(payload as IDevices);

        return newDevices;
      } else {
        const updatedDevices = Object.keys(payload).reduce(
          (acc, key) => {
            if (prevDevices[topic]?.[key] !== undefined) {
              return {
                ...acc,
                [topic]: {
                  ...acc[topic],
                  [key]:
                    key === "color"
                      ? convertXYToHexColor(
                          (payload as IPayload).color?.x ?? 0.3127,
                          (payload as IPayload).color?.y ?? 0.329
                        )
                      : (payload as IPayload)[key],
                },
              };
            }
            return acc;
          },
          { ...prevDevices }
        );

        return updatedDevices;
      }
    });
  }, []);

  // console.log(devices);

  const masterSwitchDevices = (newState: string) => {
    const newDevices = Object.keys(devices)
      .filter((key) => devices[key].stateSetting)
      .map((key) => {
        const feature = { state: newState };
        setDevice(key, feature);

        return { [key]: { ...devices[key], state: newState } };
      })
      .reduce((acc, cur) => ({ ...acc, ...cur }), {});

    setDevices({ ...newDevices });
  };

  const changeValue = (topic: string, key: string, value: number | string | boolean) => {
    const feature = { [key]: value };
    setDevices((prevDevices: ICustomDevices) => {
      return { ...prevDevices, [topic]: { ...prevDevices[topic], ...feature } };
    });
  };

  const allOn = Object.values(devices).every((device) => device.state === "ON");

  const allOff = Object.values(devices).every((device) => device.state === "OFF");

  useData(handleReceiveData);

  const handleColorChange = (newPopoutState: IColorPopoutState, newColor: string, newState: string) => {
    setColorPopout(newPopoutState);
    changeValue(newPopoutState.topic ?? "", "color", newColor ?? null);
    changeValue(newPopoutState.topic ?? "", "state", newState ?? null);
  };

  return (
    <section className={styles.cards}>
      <div className={styles.lights}>
        <MasterSwitch setDevices={masterSwitchDevices} title="Alles Aan" enabled={allOn} masterValue={"ON"} />
        <MasterSwitch setDevices={masterSwitchDevices} title="Alles Uit" enabled={allOff} masterValue={"OFF"} />

        {Object.keys(devices).map((key) => {
          const device = devices[key];

          if (device.colorSetting)
            return (
              <CardPopout
                key={key}
                topic={key}
                deviceInfo={device}
                openColor={(topic, deviceInfo) => {
                  console.log(deviceInfo);
                  if (!colorPopout.shown) setColorPopout({ topic, deviceInfo, shown: true });
                }}
              />
            );
          else if (device.brightnessSetting)
            return <CardBrightness key={key} topic={key} deviceInfo={device} onChange={changeValue} />;
          else if (device.stateSetting) return <CardState topic={key} deviceInfo={device} onChange={changeValue} />;
        })}
      </div>
      <div className={styles.sensors}></div>
      <CardColor info={colorPopout} setColorPopout={handleColorChange} />
    </section>
  );
};

export default Cards;

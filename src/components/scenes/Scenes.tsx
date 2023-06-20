import { ICustomDevices } from "../Dashboard";
import Scene from "./Scene";
import styles from "./scenes.module.scss";

interface IProps {
  devices: ICustomDevices;
  setDevices: any;
}

const Scenes = ({ devices, setDevices }: IProps) => {
  const handleSceneChange = (brightness: number) => {
    console.log("Scene change", brightness);

    setDevices((prevDevices: ICustomDevices) => {
      const newDevices = Object.keys(prevDevices)
        .map((deviceName: string) => {
          return {
            [deviceName]: prevDevices[deviceName].brightnessSetting
              ? {
                  ...prevDevices[deviceName],
                  brightness,
                  state: "ON",
                }
              : prevDevices[deviceName],
          };
        })
        .reduce((acc, cur) => ({ ...acc, ...cur }), { ...prevDevices });

      return newDevices;
    });
  };

  return (
    <section>
      <h1 className={styles.title}>Scenes</h1>
      <div className={styles["scenes-cards"]}>
        <Scene
          devices={devices}
          onSceneChange={(brightness: number) => handleSceneChange(brightness)}
          name="Lichten laag"
          brightness={76}
        />
        <Scene
          devices={devices}
          onSceneChange={(brightness: number) => handleSceneChange(brightness)}
          name="Lichten middelmatig"
          brightness={165}
        />
        <Scene
          devices={devices}
          onSceneChange={(brightness: number) => handleSceneChange(brightness)}
          name="Lichten hoog"
          brightness={254}
        />
      </div>
    </section>
  );
};

export default Scenes;

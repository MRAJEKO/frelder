import { IFeatureProperty } from "./../types/devices";
import { IDevice } from "../types/devices";

const hasProperty = (device: IDevice, property: IFeatureProperty) => {
  if (device.friendly_name === "woonkamer/klimaat") {
    console.log();
  }

  return (
    device.definition?.exposes?.some(
      (expose) => expose?.features?.find((feature) => feature.property === property) ?? expose.property === property
    ) ?? false
  );
};

export default hasProperty;

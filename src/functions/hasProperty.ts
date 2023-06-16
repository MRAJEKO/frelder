import { IFeatureProperty } from "./../types/devices";
import { IDevice } from "../types/devices";

const hasProperty = (device: IDevice, property: IFeatureProperty) =>
  device.definition?.exposes?.some((expose) =>
    expose?.features?.find((feature) => feature.property === property ?? false)
  ) ?? false;

export default hasProperty;

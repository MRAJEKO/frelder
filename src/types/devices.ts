export type IDevices = IDevice[];

interface IDevice {
  definition: null | IDefinition;
  disabled: boolean;
  friendly_name: string;
  ieee_address: string;
  type: "Coordinator" | "Router" | "EndDevice";
}

interface IDefinition {
  description: string;
  exposes: IExpose[];
  model: string;
  vendor: string;
}

interface IExpose {
  features?: IFeature[];
  access?: number;
  description?: string;
  name?: string;
  property?: IFeatureProperty;
  type: string;
  values?: string[];
  value_max?: number;
  value_min?: number;
  value_off?: string;
  value_on?: string;
  value_toggle?: string;
}

interface IFeature {
  access: number;
  description: string;
  name: string;
  property: IFeatureProperty;
  type: string;
  value_max?: number;
  value_min?: number;
  value_off?: string;
  value_on?: string;
  value_toggle?: string;
}

export type IFeatureProperty =
  | "state"
  | "color"
  | "brightness"
  | "color_temp"
  | "linkquality"
  | "action"
  | "click"
  | "power"
  | "voltage"
  | "current"
  | "consumption"
  | "temperature"
  | "humidity"
  | "pressure"
  | "illuminance"
  | "illuminance_lux"
  | "contact"
  | "water_leak"
  | "occupancy"
  | "bat";

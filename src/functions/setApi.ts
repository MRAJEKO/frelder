import { host, port, apiSet } from "../constants/connection";

export const setDevice = (device: string, feature: any) => {
  const payload = {
    device,
    feature,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  fetch(`${host}:${port}${apiSet}`, options).catch((e) => console.error(e));
};

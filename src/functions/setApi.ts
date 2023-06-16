import { host, port, apiSet } from "../config";

export const setDevice = (topic: string, feature: any) => {
  const payload = {
    topic,
    feature,
  };

  console.log(JSON.stringify(payload));

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  fetch(`${host}:${port}${apiSet}`, options).catch((e) => console.error(e));
};

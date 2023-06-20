import { host, port, apiSet } from "../config";

export const setDevice = (topic: string | null, feature: any) => {
  if (!topic) return console.error("Topic is null");

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

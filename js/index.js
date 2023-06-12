const container = document.getElementById("container");

const host = "http://192.168.0.100";

class Device {
  constructor(device) {
    this.name = device.friendly_name;

    const brightnessObject = device?.definition?.exposes
      ?.find((expose) => expose?.features?.find((feature) => feature.property === "brightness"))
      ?.features?.find((feature) => feature.property === "brightness");

    console.log(brightnessObject);

    this.brightnessSetting = brightnessObject !== undefined;
    this.brightness = null;

    this.maxValue = brightnessObject?.value_max ?? null;
    this.minValue = brightnessObject?.value_min ?? null;

    this.colorSetting =
      device?.definition?.exposes?.some((expose) => expose?.features?.find((feature) => feature.property === "color")) ?? false;
    this.color = null;

    this.stateSetting =
      device?.definition?.exposes?.some((expose) => expose?.features?.find((feature) => feature.property === "state")) ?? false;
    this.state = null;
  }

  button() {
    if (this.brightnessSetting && !this.colorSetting && this.brightness !== null) {
      const template = document.getElementById("card-brightness");
      const newButton = template.content.cloneNode(true);

      newButton.querySelector(".card-title p").textContent = this.name;

      newButton.querySelector(".cursor p").textContent = this.brightness;

      const lightsContainer = document.getElementById("lights");

      lightsContainer.appendChild(newButton);
    } else if (this.stateSetting && !this.brightnessSetting && !this.colorSetting) {
      const template = document.getElementById("card-state");

      const newButton = template.content.cloneNode(true);

      newButton.querySelector(".card-state p").textContent = this.name;

      const lightsContainer = document.getElementById("lights");

      lightsContainer.appendChild(newButton);
    }

    return this;
  }
}

let reconnectFrequency = 1; // in seconds;

/**
 * this function tries to build the SSE connection
 * this may or may not be a first try or a retry (f.i. when the server is down)
 * in case of failure it will double the time between a retry
 * starting at reconnectFrequency in seconds and max 64 seconds
 */
const tryToSetupStream = () => {
  console.log("trying to connect to SSE stream");
  setupEventSource();
  reconnectFrequency = reconnectFrequency * 2 >= 64 ? 64 : (reconnectFrequency *= 2);
};

/**
 * in case of a broken SSE stream a reconnect is scheduled
 * the longer a server is down, the long the time it will probably take
 * for the server to get back up, that is why the reconnectfrequency
 * keeps growing. The alternative would be thousands of clients spamming
 * the server for a reconnect every microsecond. This does not help anyone
 */

const reconnectToStream = () => setTimeout(tryToSetupStream, reconnectFrequency * 1000);

/**
 * setup the SSE and add handlers
 * the onmessage handler gets called when a message is received over the stream
 * the onopen handler gets called the first time a SSE connection is made
 * the onerror handler gets called when an error occurs in the event stream.
 */
let devices = {};

function setupEventSource() {
  const evtSource = new EventSource(`${host}:8000/stream`);

  evtSource.onmessage = (e) => {
    /**
     * 'e' contains the message which is reverted to a js object
     * within the message there is a 'topic' which is 'the device'
     * and a 'payload' which holds the data that comes with the device
     * for instance:
     * woonkamer/klimaat: {
     *      "battery":83,
     *      "humidity":69.77,
     *      "linkquality":255,
     *      "power_outage_count":8696,"pressure":1013.4,
     *      "temperature":18.05,"voltage":2975}
     *
     * every topic is the name of the device in two parts:
     *      location/device -> woonkamer/schemerlamp
     * there is one special topic: 'devices'
     * this topic holds all information on all devices and their
     * and is send as the first message after the SSE connects
     */

    const { topic, payload } = JSON.parse(e.data);

    console.log(payload);

    if (topic === "devices" && Object.values(devices).length === 0) {
      devices = payload.reduce((result, device) => {
        result[device.friendly_name] = new Device(device).button();

        return result;
      }, {});
    } else {
      console.log(devices);

      for (const property in payload) {
        if (devices?.[topic]?.[property] || devices?.[topic]?.[property] === null) {
          switch (property) {
            case "brightness":
              console.log("brightness");
              if (payload[property] === 0) {
                devices[topic][property] = 0;
              }
              devices[topic][property] =
                devices[topic][property] === 0
                  ? 0
                  : devices?.[topic]?.maxValue === payload[property]
                  ? 100
                  : ((devices?.[topic]?.maxValue - payload[property]) / payload[property]) * 100;
              break;
            default:
              if (devices?.[topic]?.[property] || devices?.[topic]?.[property] === null) {
                devices[topic][property] = payload[property];
              }
          }
        }
      }
    }

    // add the data to the html-console so you can see what happens
  };

  evtSource.onopen = (_e) => {
    console.log("connected to stream");
    // in case this was a retry, preemptively set back to 1
    reconnectFrequency = 1;
  };

  evtSource.onerror = (e) => {
    console.log(e);
    evtSource.close();
    console.error("an error occured, the server might be down");
    reconnectToStream();
  };
}

/* let's go! */
setupEventSource();

// document.getElementById("toggle").addEventListener("click", () => {
//   console.log("toggle");

//   const state = "toggle";
//   const topic = "woonkamer/schemerlamp";

//   const payload = {
//     topic: topic,
//     feature: {
//       state: state,
//     },
//   };
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   };

//   fetch(`${host}:8000/api/set`, options).catch((e) => console.log(e));
// });

// document.getElementById("colorPicker").addEventListener("change", () => {
//   console.log("change");
//   const color = document.getElementById("colorPicker").value;
//   return setDevice("woonkamer/schemerlamp", {
//     color: { hex: color },
//   });
// });

function setDevice(topic, feature) {
  const payload = {
    topic,
    feature,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  fetch(`${host}:8000/api/set`, options)
    .then("Set state of: " + topic)
    .catch((e) => console.log(e));
}

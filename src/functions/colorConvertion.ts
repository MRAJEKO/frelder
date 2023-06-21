// export const convertXYToHexColor = (x: number, y: number) => {
//   x = Math.round(x * 10000) / 10000;
//   y = Math.round(y * 10000) / 10000;

//   const z = 1.0 - x - y;
//   const Y = brightness / 254;
//   const X = (Y / y) * x;
//   const Z = (Y / y) * z;

//   const r = Math.round(
//     (X * 1.656492 - Y * 0.354851 - Z * 0.255038 <= 0.0031308
//       ? 12.92 * X * 1.656492 - Y * 0.354851 - Z * 0.255038
//       : 1.055 * Math.pow(X * 1.656492 - Y * 0.354851 - Z * 0.255038, 1 / 2.4) - 0.055) * 255
//   );
//   const g = Math.round(
//     (-X * 0.707196 + Y * 1.655397 + Z * 0.036152 <= 0.0031308
//       ? 12.92 * -X * 0.707196 + Y * 1.655397 + Z * 0.036152
//       : 1.055 * Math.pow(-X * 0.707196 + Y * 1.655397 + Z * 0.036152, 1 / 2.4) - 0.055) * 255
//   );
//   const b = Math.round(
//     (X * 0.051713 - Y * 0.121364 + Z * 1.01153 <= 0.0031308
//       ? 12.92 * X * 0.051713 - Y * 0.121364 + Z * 1.01153
//       : 1.055 * Math.pow(X * 0.051713 - Y * 0.121364 + Z * 1.01153, 1 / 2.4) - 0.055) * 255
//   );

//   const hexR = r.toString(16).padStart(2, "0");
//   const hexG = g.toString(16).padStart(2, "0");
//   const hexB = b.toString(16).padStart(2, "0");

//   console.log(hexR, hexG, hexB);

//   return "#" + hexR + hexG + hexB;
// };

export const convertXYToHexColor = (x: number, y: number) => {
  const r = x * 1.656492 - y * 0.354851 - 0.255038;
  const g = -x * 0.707196 + y * 1.655397 + 0.036152;
  const b = x * 0.051713 - y * 0.121364 + 1.01153;

  const scaledR = Math.round(Math.max(0, Math.min(1, r)) * 255);
  const scaledG = Math.round(Math.max(0, Math.min(1, g)) * 255);
  const scaledB = Math.round(Math.max(0, Math.min(1, b)) * 255);

  const hexColor = rgbToHex(scaledR, scaledG, scaledB);
  return hexColor;
};

export const rgbToHex = (r: number, g: number, b: number) => {
  const hexR = r.toString(16).padStart(2, "0");
  const hexG = g.toString(16).padStart(2, "0");
  const hexB = b.toString(16).padStart(2, "0");
  const hexColor = "#" + hexR + hexG + hexB;
  return hexColor;
};

export const contrastColor = (hex: string) => {
  if (hex.startsWith("#")) {
    hex = hex.slice(1);
  }

  if (hex.length === 3) {
    hex = hex.replace(/./g, (char: string) => char + char);
  }

  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.");
  }

  const [r, g, b] = (hex.match(/.{2}/g) ?? []).map((val) => parseInt(val, 16));

  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
};

export const convertHexToXY = (hexColor: string) => {
  if (hexColor.startsWith("#")) {
    hexColor = hexColor.slice(1);
  }

  if (!/^([0-9A-Fa-f]{3}){1,2}$/.test(hexColor)) {
    throw new Error("Invalid HEX color.");
  }

  const r = parseInt(hexColor.substr(0, 2), 16) / 255;
  const g = parseInt(hexColor.substr(2, 2), 16) / 255;
  const b = parseInt(hexColor.substr(4, 2), 16) / 255;

  const gammaCorrectedR = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  const gammaCorrectedG = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  const gammaCorrectedB = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  const X = gammaCorrectedR * 0.664511 + gammaCorrectedG * 0.154324 + gammaCorrectedB * 0.162028;
  const Y = gammaCorrectedR * 0.283881 + gammaCorrectedG * 0.668433 + gammaCorrectedB * 0.047685;
  const Z = gammaCorrectedR * 0.000088 + gammaCorrectedG * 0.07231 + gammaCorrectedB * 0.986039;

  const x = X / (X + Y + Z);
  const y = Y / (X + Y + Z);

  return { x, y };
};

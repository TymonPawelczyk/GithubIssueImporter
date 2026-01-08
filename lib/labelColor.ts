// lib/labelColor.ts

/**
 * Generuje deterministyczny kolor HEX (bez #) na podstawie nazwy labela.
 * Używa hasha FNV-1a do wyboru odcienia (Hue), przy stałym nasyceniu i jasności.
 */
export function labelNameToColorHex(name: string): string {
  let hash = 0x811c9dc5;
  const len = name.length;

  for (let i = 0; i < len; i++) {
    hash ^= name.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }

  // Oblicz Hue (0-360)
  const hue = Math.abs(hash % 360);
  const saturation = 70; // Stałe nasycenie (dobra widoczność)
  const lightness = 45; // Stała jasność (dobry kontrast z białym tekstem)

  return hslToHex(hue, saturation, lightness);
}

function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `${f(0)}${f(8)}${f(4)}`;
}

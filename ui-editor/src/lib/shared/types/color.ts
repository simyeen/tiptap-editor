export type RGB = {r: number; g: number; b: number};
export type ColorPickerState = {mode: 'NAMED'; color: string};

export type ColorItem = {
  cssVar: string;
  label: string;
  darkLabel?: string;
  rgb?: RGB;
};

export type ColorPalette = {
  label: string;
  colors: ColorItem[];
  inverse: string;
};

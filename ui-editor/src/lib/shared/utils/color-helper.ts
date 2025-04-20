import {ColorPickerState} from '../types';

export function colorHelper(colorPickerState: ColorPickerState): string {
  return colorPickerState.color;
}

export function parseColorString(color: string): ColorPickerState {
  return {
    mode: 'NAMED',
    color,
  };
}

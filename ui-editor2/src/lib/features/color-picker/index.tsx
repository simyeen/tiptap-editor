import {ToggleGroup} from '../../shared/shadcn';
import {ColorPalette, ColorPickerState} from '../../shared/types';
import {parseColorString} from '../../shared/utils';
import ColorButton from './color-button';

interface ColorPickerProps {
  palette: ColorPalette;
  selectedColor: string;
  inverse: string;
  onColorChange: (value: ColorPickerState) => void;
}

export function ColorPicker({palette, selectedColor, inverse, onColorChange}: ColorPickerProps) {
  return (
    <ToggleGroup
      type="single"
      value={selectedColor}
      onValueChange={(value: string) => {
        if (value) onColorChange(parseColorString(value));
      }}
      className="gap-1.5"
    >
      {palette.colors.map((color, index) => (
        <ColorButton
          key={index}
          inverse={inverse}
          color={color}
          isSelected={selectedColor === color.cssVar}
          onClick={onColorChange}
        />
      ))}
    </ToggleGroup>
  );
}

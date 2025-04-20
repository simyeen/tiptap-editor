import {
  Button,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  cn,
  type toggleVariants,
} from '@kt-web-dev-package/ui-core';
import type {Editor} from '@tiptap/react';
import type {VariantProps} from 'class-variance-authority';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronsUpDownIcon,
  HighlighterIcon,
  PenIcon,
  TypeIcon,
  TypeOutlineIcon,
} from 'lucide-react';
import * as React from 'react';

import {useTheme} from '../../hooks/use-theme';
import {ColorPickerState, RGB} from '../../type';
import {
  getColorString,
  hexToRgba,
  hslToCssString,
  hslToHex,
  parseColorString,
  rgbToCssString,
  rgbToHsl,
} from '../../util';
import {ToolbarButton} from '../toolbar-button';

interface ColorItem {
  cssVar: string;
  label: string;
  darkLabel?: string;
  rgb?: RGB;
}

interface ColorPalette {
  label: string;
  colors: ColorItem[];
  inverse: string;
}

const COLORS: ColorPalette[] = [
  {
    label: 'Palette 1',
    inverse: 'hsl(var(--background))',
    colors: [
      {cssVar: 'hsl(var(--foreground))', label: '기본 색상', rgb: {r: 15, g: 23, b: 42}},
      {
        cssVar: 'var(--mt-accent-bold-blue)',
        label: '짙은 파랑',
        rgb: {r: 0, g: 85, b: 204},
      },
      {
        cssVar: 'var(--mt-accent-bold-teal)',
        label: '짙은 청록',
        rgb: {r: 32, g: 106, b: 131},
      },
      {
        cssVar: 'var(--mt-accent-bold-green)',
        label: '짙은 초록',
        rgb: {r: 33, g: 110, b: 78},
      },
      {
        cssVar: 'var(--mt-accent-bold-orange)',
        label: '짙은 주황',
        rgb: {r: 165, g: 72, b: 0},
      },
      {
        cssVar: 'var(--mt-accent-bold-red)',
        label: '짙은 빨강',
        rgb: {r: 174, g: 46, b: 36},
      },
      {
        cssVar: 'var(--mt-accent-bold-purple)',
        label: '짙은 보라',
        rgb: {r: 94, g: 77, b: 178},
      },
    ],
  },
  {
    label: 'Palette 2',
    inverse: 'hsl(var(--background))',
    colors: [
      {cssVar: 'var(--mt-accent-gray)', label: '회색', rgb: {r: 117, g: 129, b: 149}},
      {cssVar: 'var(--mt-accent-blue)', label: '파랑', rgb: {r: 29, g: 122, b: 252}},
      {cssVar: 'var(--mt-accent-teal)', label: '청록', rgb: {r: 40, g: 152, b: 189}},
      {cssVar: 'var(--mt-accent-green)', label: '초록', rgb: {r: 4, g: 160, b: 107}},
      {cssVar: 'var(--mt-accent-orange)', label: '주황', rgb: {r: 254, g: 163, b: 98}},
      {cssVar: 'var(--mt-accent-red)', label: '빨강', rgb: {r: 201, g: 55, b: 44}},
      {cssVar: 'var(--mt-accent-purple)', label: '보라', rgb: {r: 130, g: 112, b: 219}},
    ],
  },
  {
    label: 'Palette 3',
    inverse: 'hsl(var(--foreground))',
    colors: [
      {
        cssVar: 'hsl(var(--background))',
        label: '백색',
        darkLabel: '흑색',
        rgb: {r: 255, g: 255, b: 255},
      },
      {
        cssVar: 'var(--mt-accent-blue-subtler)',
        label: '밝은 파랑',
        rgb: {r: 204, g: 224, b: 255},
      },
      {
        cssVar: 'var(--mt-accent-teal-subtler)',
        label: '밝은 청록',
        rgb: {r: 198, g: 237, b: 251},
      },
      {
        cssVar: 'var(--mt-accent-green-subtler)',
        label: '밝은 초록',
        rgb: {r: 186, g: 243, b: 219},
      },
      {
        cssVar: 'var(--mt-accent-yellow-subtler)',
        label: '밝은 노랑',
        rgb: {r: 248, g: 230, b: 160},
      },
      {
        cssVar: 'var(--mt-accent-red-subtler)',
        label: '밝은 빨강',
        rgb: {r: 255, g: 213, b: 210},
      },
      {
        cssVar: 'var(--mt-accent-purple-subtler)',
        label: '밝은 보라',
        rgb: {r: 223, g: 216, b: 253},
      },
    ],
  },
];

interface ColorButtonProps {
  color: ColorItem;
  isSelected: boolean;
  inverse: string;
  onClick: (value: ColorPickerState) => void;
}

function ColorButton({color, isSelected, inverse, onClick}: ColorButtonProps) {
  const isDarkMode = useTheme();
  const label = isDarkMode && color.darkLabel ? color.darkLabel : color.label;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ToggleGroupItem
          tabIndex={0}
          className="relative size-7 rounded-md p-0"
          value={color.cssVar}
          aria-label={label}
          style={{backgroundColor: color.cssVar}}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            onClick(parseColorString(color.cssVar));
          }}
        >
          {isSelected && (
            <CheckIcon className="absolute inset-0 m-auto size-6" style={{color: inverse}} />
          )}
        </ToggleGroupItem>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}

interface ColorPickerProps {
  palette: ColorPalette;
  selectedColor: string;
  inverse: string;
  onColorChange: (value: ColorPickerState) => void;
}

function ColorPicker({palette, selectedColor, inverse, onColorChange}: ColorPickerProps) {
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

export function InputWithLabel({
  className,
  id,
  label,
  placeholder,
  defaultValue,
  onChange,
}: {
  className?: string;
  id: string;
  label: string;
  placeholder: string;
  defaultValue: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className={cn('flex grow flex-col items-center gap-1.5', className)}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
}

interface ColorInputProps {
  pickedColor: ColorPickerState;
  onToggleButtonClick: (value: ColorPickerState) => void;
  handleColorChange: (value: ColorPickerState) => void;
}

function ColorInput({pickedColor, onToggleButtonClick, handleColorChange}: ColorInputProps) {
  return (
    <div className="grid grid-cols-4 items-end gap-2">
      {pickedColor.mode === 'HEX' && (
        <InputWithLabel
          id="hex"
          label="HEX"
          placeholder="hex값을 입력해주세요"
          defaultValue={pickedColor.hex}
          className="col-span-3"
          onChange={(value) => {
            handleColorChange({...pickedColor, hex: value});
          }}
        />
      )}
      {pickedColor.mode === 'RGB' && (
        <>
          <InputWithLabel
            id="r"
            label="R"
            placeholder="r값을 입력해주세요"
            defaultValue={pickedColor.rgb.r.toString()}
            onChange={(value) => {
              if (!isNaN(Number(value))) {
                handleColorChange({...pickedColor, rgb: {...pickedColor.rgb, r: Number(value)}});
              }
            }}
          />
          <InputWithLabel
            id="g"
            label="G"
            placeholder="g값을 입력해주세요"
            defaultValue={pickedColor.rgb.g.toString()}
            onChange={(value) => {
              if (!isNaN(Number(value))) {
                handleColorChange({...pickedColor, rgb: {...pickedColor.rgb, g: Number(value)}});
              }
            }}
          />
          <InputWithLabel
            id="b"
            label="B"
            placeholder="b값을 입력해주세요"
            defaultValue={pickedColor.rgb.b.toString()}
            onChange={(value) => {
              if (!isNaN(Number(value))) {
                handleColorChange({...pickedColor, rgb: {...pickedColor.rgb, b: Number(value)}});
              }
            }}
          />
        </>
      )}
      {pickedColor.mode === 'HSL' && (
        <>
          <InputWithLabel
            id="h"
            label="H"
            placeholder="h값을 입력해주세요"
            defaultValue={pickedColor.hsl.h.toString()}
            onChange={(value) => {
              if (!isNaN(Number(value))) {
                handleColorChange({...pickedColor, hsl: {...pickedColor.hsl, h: Number(value)}});
              }
            }}
          />
          <InputWithLabel
            id="s"
            label="S"
            placeholder="s값을 입력해주세요"
            defaultValue={pickedColor.hsl.s.toString()}
            onChange={(value) => {
              if (!isNaN(Number(value))) {
                handleColorChange({...pickedColor, hsl: {...pickedColor.hsl, s: Number(value)}});
              }
            }}
          />
          <InputWithLabel
            id="l"
            label="L"
            placeholder="l값을 입력해주세요"
            defaultValue={pickedColor.hsl.l.toString()}
            onChange={(value) => {
              if (!isNaN(Number(value))) {
                handleColorChange({...pickedColor, hsl: {...pickedColor.hsl, l: Number(value)}});
              }
            }}
          />
        </>
      )}
      <div
        className={cn(
          'flex grow flex-col items-center justify-between gap-1.5',
          pickedColor.mode === 'NAMED' ? 'col-span-4' : 'col-span-1'
        )}
      >
        <Label htmlFor="toggle">{pickedColor.mode === 'NAMED' ? 'Toggle to RGB' : 'Toggle'}</Label>
        <Button
          className="w-full px-3"
          id="toggle"
          variant="outline"
          onClick={() => onToggleButtonClick(pickedColor)}
        >
          {pickedColor.mode === 'NAMED'
            ? '값을 입력하려면 버튼을 클릭하세요'
            : pickedColor.mode === 'HEX'
              ? 'RGB'
              : pickedColor.mode === 'RGB'
                ? 'HSL'
                : pickedColor.mode === 'HSL'
                  ? 'HEX'
                  : ''}
          {pickedColor.mode === 'NAMED' && <ChevronsUpDownIcon className="size-5" />}
        </Button>
      </div>
    </div>
  );
}

interface SectionTextColorProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
}

export function SectionTextColor({editor, size, variant}: SectionTextColorProps) {
  const color: string = editor.getAttributes('textStyle')?.color || 'hsl(var(--foreground))';
  const [pickedColor, setPickedColor] = React.useState(parseColorString(color));

  const handlePickedColorChange = React.useCallback(
    (value: ColorPickerState) => {
      setPickedColor({...value});
      let colorString;
      if (value.mode === 'NAMED') {
        colorString = value.color;
      } else if (value.mode === 'HEX') {
        colorString = value.hex;
      } else if (value.mode === 'RGB') {
        colorString = rgbToCssString(value.rgb);
      } else {
        colorString = hslToCssString(value.hsl);
      }
      editor.chain().setColor(colorString).run();
    },
    [editor]
  );

  const handleToggleMode = React.useCallback(
    (value: ColorPickerState) => {
      if (value.mode === 'NAMED') {
        const rgb = COLORS.find((palette) =>
          palette.colors.some((color) => color.cssVar === value.color)
        )?.colors.find((color) => color.cssVar === value.color)?.rgb || {
          r: 15,
          g: 23,
          b: 42,
        };
        handlePickedColorChange({mode: 'RGB', rgb});
      } else if (value.mode === 'HEX') {
        const rgb = hexToRgba(value.hex);
        handlePickedColorChange({mode: 'RGB', rgb});
      } else if (value.mode === 'RGB') {
        const hsl = rgbToHsl(value.rgb);
        handlePickedColorChange({mode: 'HSL', hsl});
      } else if (value.mode === 'HSL') {
        const hex = hslToHex(value.hsl);
        handlePickedColorChange({mode: 'HEX', hex});
      }
    },
    [editor]
  );

  const handleColorChange = React.useCallback(
    (value: ColorPickerState) => {
      handlePickedColorChange(value);
    },
    [editor]
  );

  React.useEffect(() => {
    setPickedColor(parseColorString(color));
  }, [color]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ToolbarButton
          tooltip="글자색"
          aria-label="Text color"
          className="w-5 flex-col gap-1"
          size={size}
          variant={variant}
        >
          <TypeIcon className="size-5" />
          <div className={cn('h-1 w-5')} style={{backgroundColor: getColorString(pickedColor)}} />
          {/* <ChevronDownIcon className="size-5" /> */}
        </ToolbarButton>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-full max-w-[350px]">
        <div className="space-y-1.5">
          {COLORS.map((palette, index) => (
            <ColorPicker
              key={index}
              palette={palette}
              inverse={palette.inverse}
              selectedColor={getColorString(pickedColor)}
              onColorChange={handleColorChange}
            />
          ))}
          <ColorInput
            pickedColor={pickedColor}
            onToggleButtonClick={handleToggleMode}
            handleColorChange={handleColorChange}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function SectionHighlight({editor, size, variant}: SectionTextColorProps) {
  const color: string = editor.getAttributes('highlight')?.color || 'hsl(var(--background))';
  const [pickedColor, setPickedColor] = React.useState(parseColorString(color));

  const handlePickedColorChange = React.useCallback(
    (value: ColorPickerState) => {
      setPickedColor({...value});
      let colorString;
      if (value.mode === 'NAMED') {
        colorString = value.color;
      } else if (value.mode === 'HEX') {
        colorString = value.hex;
      } else if (value.mode === 'RGB') {
        colorString = rgbToCssString(value.rgb);
      } else {
        colorString = hslToCssString(value.hsl);
      }
      if (colorString === 'hsl(var(--background))') {
        editor.chain().unsetHighlight().run();
      } else {
        editor.chain().setHighlight({color: colorString}).run();
      }
    },
    [editor]
  );

  const handleToggleMode = React.useCallback(
    (value: ColorPickerState) => {
      if (value.mode === 'NAMED') {
        const rgb = COLORS.find((palette) =>
          palette.colors.some((color) => color.cssVar === value.color)
        )?.colors.find((color) => color.cssVar === value.color)?.rgb || {
          r: 15,
          g: 23,
          b: 42,
          a: 100,
        };
        handlePickedColorChange({mode: 'RGB', rgb});
      } else if (value.mode === 'HEX') {
        const rgb = hexToRgba(value.hex);
        handlePickedColorChange({mode: 'RGB', rgb});
      } else if (value.mode === 'RGB') {
        const hsl = rgbToHsl(value.rgb);
        handlePickedColorChange({mode: 'HSL', hsl});
      } else if (value.mode === 'HSL') {
        const hex = hslToHex(value.hsl);
        handlePickedColorChange({mode: 'HEX', hex});
      }
    },
    [editor]
  );

  const handleColorChange = React.useCallback(
    (value: ColorPickerState) => {
      handlePickedColorChange(value);
    },
    [editor]
  );

  React.useEffect(() => {
    setPickedColor(parseColorString(color));
  }, [color]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ToolbarButton
          tooltip="배경색"
          aria-label="Text color"
          className="w-5 flex-col gap-1"
          size={size}
          variant={variant}
        >
          <HighlighterIcon className="size-5" />
          <div className={cn('h-1 w-5')} style={{backgroundColor: getColorString(pickedColor)}} />
        </ToolbarButton>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-full max-w-[350px]">
        <div className="space-y-1.5">
          {COLORS.map((palette, index) => (
            <ColorPicker
              key={index}
              palette={palette}
              inverse={palette.inverse}
              selectedColor={getColorString(pickedColor)}
              onColorChange={handleColorChange}
            />
          ))}
          <ColorInput
            pickedColor={pickedColor}
            onToggleButtonClick={handleToggleMode}
            handleColorChange={handleColorChange}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

import {CheckIcon} from 'lucide-react';

import {
  TooltipContent as Content,
  ToggleGroupItem,
  Tooltip,
  TooltipTrigger as Trigger,
} from '../../../../../shared/shadcn';
import {ColorItem, ColorPickerState} from '../../../../../shared/types';
import {parseColorString} from '../../../../../shared/utils';
import useTheme from '../../../hooks/use-theme';

interface ColorButtonProps {
  color: ColorItem;
  isSelected: boolean;
  inverse: string;
  onClick: (value: ColorPickerState) => void;
}

export default function ColorButton({color, isSelected, inverse, onClick}: ColorButtonProps) {
  const isDarkMode = useTheme();
  const label = isDarkMode && color.darkLabel ? color.darkLabel : color.label;

  return (
    <Tooltip>
      <Trigger asChild>
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
      </Trigger>

      <Content side="bottom">
        <p>{label}</p>
      </Content>
    </Tooltip>
  );
}

import type {VariantProps} from 'class-variance-authority';
import {HighlighterIcon} from 'lucide-react';
import * as React from 'react';

import {cn} from '@shared/ui-theme';
import {type Editor, useEditorState} from '@tiptap/react';

import {ColorPicker} from '../../../../features';
import {
  PopoverContent as Content,
  Popover,
  PopoverTrigger as Trigger,
  toggleVariants,
} from '../../../../shared/shadcn';
import {ColorPickerState} from '../../../../shared/types';
import {AppToolbarButton} from '../../../../shared/ui';
import {colorHelper, parseColorString} from '../../../../shared/utils';
import {COLORS} from '../../constants/colors';

interface SectionHighlightProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
}

export function ColorBackgroundTools({editor, size, variant}: SectionHighlightProps) {
  const defaultColor = 'hsl(var(--background))';
  const {color} = useEditorState({
    editor,
    selector: ({editor}: {editor: Editor}) => ({
      color: editor.getAttributes('highlight')?.color,
    }),
  });

  const handlePickedColorChange = React.useCallback(
    (value: ColorPickerState) => {
      let colorString = '';
      if (value.mode === 'NAMED') {
        colorString = value.color;
      }
      if (colorString === 'hsl(var(--background))') {
        editor.chain().unsetHighlight().run();
      } else {
        editor.chain().setHighlight({color: colorString}).run();
      }
    },
    [editor]
  );

  const handleColorChange = React.useCallback(
    (value: ColorPickerState) => {
      handlePickedColorChange(value);
    },
    [handlePickedColorChange]
  );

  return (
    <Popover>
      <Trigger asChild>
        <AppToolbarButton
          tooltip="배경색"
          aria-label="Text color"
          className="w-5 flex-col gap-1"
          size={size}
          variant={variant}
        >
          <HighlighterIcon className="size-5" />
          <div
            className={cn('h-1 w-5')}
            style={{backgroundColor: colorHelper(parseColorString(color ? color : defaultColor))}}
          />
        </AppToolbarButton>
      </Trigger>

      <Content align="start" className="w-full max-w-[350px]">
        <div className="space-y-1.5">
          {COLORS.map((palette, index) => (
            <ColorPicker
              key={index}
              palette={palette}
              inverse={palette.inverse}
              selectedColor={colorHelper(parseColorString(color ? color : defaultColor))}
              onColorChange={handleColorChange}
            />
          ))}
        </div>
      </Content>
    </Popover>
  );
}

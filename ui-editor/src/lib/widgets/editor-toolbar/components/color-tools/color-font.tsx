import type {VariantProps} from 'class-variance-authority';
import {TypeIcon} from 'lucide-react';
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

interface SectionTextColorProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
}

export function ColorFontTools({editor, size, variant}: SectionTextColorProps) {
  const defaultColor = 'hsl(var(--foreground))';
  const {color} = useEditorState({
    editor,
    selector: ({editor}: {editor: Editor}) => ({
      color: editor.getAttributes('textStyle')?.color,
    }),
  });
  const handlePickedColorChange = React.useCallback(
    (value: ColorPickerState) => {
      let colorString = '';
      if (value.mode === 'NAMED') {
        colorString = value.color;
      }
      editor.chain().setColor(colorString).run();
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
          tooltip="글자색"
          aria-label="Text color"
          className="w-5 flex-col gap-1"
          size={size}
          variant={variant}
        >
          <TypeIcon className="size-5" />

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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  cn,
  type toggleVariants,
} from '@kt-web-dev-package/ui-core';
import {type Editor, useEditorState} from '@tiptap/react';
import type {VariantProps} from 'class-variance-authority';
import {CheckIcon, ChevronDownIcon} from 'lucide-react';
import * as React from 'react';

import type {FormatAction} from '../../type';
import {getFontSizeText} from '../../util';
import {ToolbarButton} from '../toolbar-button';

interface TextStyle
  extends Omit<FormatAction, 'icon' | 'action' | 'canExecute' | 'isActive' | 'shortcuts'> {
  element: keyof JSX.IntrinsicElements;
}

const formatActions: TextStyle[] = [
  {
    label: '기본값',
    element: 'span',
    value: '',
  },
  {
    label: '8',
    element: 'span',
    value: '8px',
  },
  {
    label: '10',
    element: 'span',
    value: '10px',
  },
  {
    label: '12',
    element: 'span',
    value: '12px',
  },
  {
    label: '14',
    element: 'span',
    value: '14px',
  },
  {
    label: '16',
    element: 'span',
    value: '16px',
  },
  {
    label: '18',
    element: 'span',
    value: '18px',
  },
  {
    label: '24',
    element: 'span',
    value: '24px',
  },
  {
    label: '30',
    element: 'span',
    value: '30px',
  },
  {
    label: '36',
    element: 'span',
    value: '36px',
  },
  {
    label: '48',
    element: 'span',
    value: '48px',
  },
  {
    label: '60',
    element: 'span',
    value: '60px',
  },
  {
    label: '72',
    element: 'span',
    value: '72px',
  },
  {
    label: '96',
    element: 'span',
    value: '96px',
  },
];

interface SectionFontSizeProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
}

export function SectionFontSize({editor, size, variant}: SectionFontSizeProps) {
  const editorState = useEditorState({
    editor,
    selector: ({editor}: {editor: Editor}) => ({
      isActiveCode: editor.isActive('code'),
    }),
  });
  const handleStyleChange = React.useCallback(
    (value: string) => {
      if (value) {
        editor.chain().focus().setFontSize(value).run();
      } else {
        editor.chain().focus().unsetFontSize().run();
      }
    },
    [editor]
  );

  const renderMenuItem = React.useCallback(
    ({label, element: Element, value}: TextStyle) => (
      <DropdownMenuItem
        key={label}
        onClick={() => handleStyleChange(value)}
        className={cn('hover:bg-fg-100 flex flex-row items-center justify-between gap-4', {
          'text-fg-point': value
            ? editor.isActive('textStyle', {fontSize: value})
            : !editor.isActive('textStyle') && !editor.getAttributes('textStyle').fontSize,
        })}
        aria-label={label}
      >
        <Element className="grow">{label}</Element>
        {(value
          ? editor.isActive('textStyle', {fontSize: value})
          : !editor.isActive('textStyle') && !editor.getAttributes('textStyle').fontSize) && (
          <CheckIcon className="text-fg-point size-5" />
        )}
      </DropdownMenuItem>
    ),
    [editor, handleStyleChange]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          tooltip="글자 크기"
          aria-label="Font size"
          className="flex min-w-14 justify-between gap-0"
          disabled={editorState.isActiveCode}
          size={size}
          variant={variant}
        >
          {getFontSizeText(editor)}
          <ChevronDownIcon className="stroke-fg-600" />
        </ToolbarButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-full min-w-min"
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          e.stopPropagation();
          editor.commands.focus();
        }}
      >
        {formatActions.map(renderMenuItem)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

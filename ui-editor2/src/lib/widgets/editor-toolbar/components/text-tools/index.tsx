import type {VariantProps} from 'class-variance-authority';
import {BoldIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon} from 'lucide-react';

import {type Editor, useEditorState} from '@tiptap/react';

import {ToolbarMenu} from '../../../../features';
import type {toggleVariants} from '../../../../shared/shadcn';
import {FormatAction} from '../../../../shared/types';

type TextStyleAction = 'bold' | 'italic' | 'underline' | 'strikethrough';

interface TextStyle extends FormatAction {
  value: TextStyleAction;
}

interface SectionTextStyleProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
}

export default function TextTools({editor, size, variant}: SectionTextStyleProps) {
  const {
    isActiveBold,
    isActiveItalic,
    isActiveStrikethrough,
    isActiveUnderline,
    canExecuteBold,
    canExecuteItalic,
    canExecuteStrikethrough,
    canExecuteUnderline,
  } = useEditorState({
    editor,
    selector: ({editor}: {editor: Editor}) => ({
      isActiveBold: editor.isActive('bold'),
      isActiveItalic: editor.isActive('italic'),
      isActiveUnderline: editor.isActive('underline'),
      isActiveStrikethrough: editor.isActive('strike'),
      canExecuteBold:
        editor.can().chain().focus().toggleBold().run() && !editor.isActive('codeBlock'),
      canExecuteItalic:
        editor.can().chain().focus().toggleItalic().run() && !editor.isActive('codeBlock'),
      canExecuteUnderline:
        editor.can().chain().focus().toggleUnderline().run() && !editor.isActive('codeBlock'),
      canExecuteStrikethrough:
        editor.can().chain().focus().toggleStrike().run() && !editor.isActive('codeBlock'),
    }),
  });

  const TextOptions: TextStyle[] = [
    {
      value: 'bold',
      label: '굵기',
      icon: <BoldIcon />,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: isActiveBold,
      canExecute: canExecuteBold,
      shortcuts: ['mod', 'B'],
    },
    {
      value: 'italic',
      label: '기울이기',
      icon: <ItalicIcon />,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: isActiveItalic,
      canExecute: canExecuteItalic,
      shortcuts: ['mod', 'I'],
    },
    {
      value: 'underline',
      label: '밑줄',
      icon: <UnderlineIcon />,
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: isActiveUnderline,
      canExecute: canExecuteUnderline,
      shortcuts: ['mod', 'U'],
    },
    {
      value: 'strikethrough',
      label: '취소선',
      icon: <StrikethroughIcon />,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: isActiveStrikethrough,
      canExecute: canExecuteStrikethrough,
      shortcuts: ['mod', 'shift', 'S'],
    },
  ];

  return <ToolbarMenu actions={TextOptions} size={size} variant={variant} />;
}

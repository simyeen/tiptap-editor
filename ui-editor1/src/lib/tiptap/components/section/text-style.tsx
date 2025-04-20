import type {toggleVariants} from '@kt-web-dev-package/ui-core';
import {type Editor, isActive, useEditorState} from '@tiptap/react';
import type {VariantProps} from 'class-variance-authority';
import {
  BoldIcon,
  CodeIcon,
  EllipsisIcon,
  ItalicIcon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  SubscriptIcon,
  SuperscriptIcon,
  UnderlineIcon,
} from 'lucide-react';
import * as React from 'react';

import type {FormatAction} from '../../type';
import {ToolbarSection} from '../toolbar-section';

type TextStyleAction =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'code'
  | 'superscript'
  | 'subscript'
  | 'clearFormatting';

interface TextStyle extends FormatAction {
  value: TextStyleAction;
}

const formatActions: TextStyle[] = [
  {
    value: 'bold',
    label: '굵기',
    icon: <BoldIcon />,
    action: (editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor) => editor.isActive('bold'),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleBold().run() && !editor.isActive('codeBlock'),
    shortcuts: ['mod', 'B'],
  },
  {
    value: 'italic',
    label: '기울이기',
    icon: <ItalicIcon />,
    action: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive('italic'),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleItalic().run() && !editor.isActive('codeBlock'),
    shortcuts: ['mod', 'I'],
  },
  {
    value: 'underline',
    label: '밑줄',
    icon: <UnderlineIcon />,
    action: (editor) => editor.chain().focus().toggleUnderline().run(),
    isActive: (editor) => editor.isActive('underline'),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleUnderline().run() && !editor.isActive('codeBlock'),
    shortcuts: ['mod', 'U'],
  },
  {
    value: 'strikethrough',
    label: '취소선',
    icon: <StrikethroughIcon />,
    action: (editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor) => editor.isActive('strike'),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleStrike().run() && !editor.isActive('codeBlock'),
    shortcuts: ['mod', 'shift', 'S'],
  },
  {
    value: 'code',
    label: '코드',
    icon: <CodeIcon />,
    action: (editor) => editor.chain().focus().toggleCode().run(),
    isActive: (editor) => editor.isActive('code'),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleCode().run() && !editor.isActive('codeBlock'),
    shortcuts: ['mod', 'E'],
  },
  {
    value: 'superscript',
    label: '윗첨자',
    icon: <SuperscriptIcon />,
    action: (editor) => editor.chain().focus().toggleSuperscript().run(),
    isActive: (editor) => editor.isActive('superscript'),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleSuperscript().run() && !editor.isActive('codeBlock'),
    shortcuts: ['mod', ','],
  },
  {
    value: 'subscript',
    label: '아랫첨자',
    icon: <SubscriptIcon />,
    action: (editor) => editor.chain().focus().toggleSubscript().run(),
    isActive: (editor) => editor.isActive('subscript'),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleSubscript().run() && !editor.isActive('codeBlock'),
    shortcuts: ['mod', '.'],
  },
  {
    value: 'clearFormatting',
    label: '스타일 초기화',
    icon: <RemoveFormattingIcon />,
    action: (editor) => {
      editor.chain().focus().unsetBold().run();
      editor.chain().focus().unsetItalic().run();
      editor.chain().focus().unsetUnderline().run();
      editor.chain().focus().unsetStrike().run();
      editor.chain().focus().unsetCode().run();
      editor.chain().focus().unsetSuperscript().run();
      editor.chain().focus().unsetSubscript().run();
    },
    isActive: () => false,
    canExecute: (editor) => editor.can().chain().focus().unsetAllMarks().run(),
    shortcuts: ['mod', '\\'],
  },
];

interface SectionTextStyleProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
}

export const SectionTextStyle: React.FC<SectionTextStyleProps> = ({editor, size, variant}) => {
  const editorState = useEditorState({
    editor,
    selector: ({editor}: {editor: Editor}) => ({
      isActiveBold: editor.isActive('bold'),
      isActiveItalic: editor.isActive('italic'),
      isActiveUnderline: editor.isActive('underline'),
      isActiveStrikethrough: editor.isActive('strike'),
      isActiveSuperscript: editor.isActive('superscript'),
      isActiveSubscript: editor.isActive('subscript'),
      isActiveCode: editor.isActive('code'),
      isActiveClearFormatting:
        editor.isActive('bold') ||
        editor.isActive('italic') ||
        editor.isActive('underline') ||
        editor.isActive('strike') ||
        editor.isActive('superscript') ||
        editor.isActive('subscript') ||
        editor.isActive('code'),
      canExecuteBold:
        editor.can().chain().focus().toggleBold().run() && !editor.isActive('codeBlock'),
      canExecuteItalic:
        editor.can().chain().focus().toggleItalic().run() && !editor.isActive('codeBlock'),
      canExecuteUnderline:
        editor.can().chain().focus().toggleUnderline().run() && !editor.isActive('codeBlock'),
      canExecuteStrikethrough:
        editor.can().chain().focus().toggleStrike().run() && !editor.isActive('codeBlock'),
      canExecuteSuperscript:
        editor.can().chain().focus().toggleSuperscript().run() && !editor.isActive('codeBlock'),
      canExecuteSubscript:
        editor.can().chain().focus().toggleSubscript().run() && !editor.isActive('codeBlock'),
      canExecuteCode:
        editor.can().chain().focus().toggleCode().run() && !editor.isActive('codeBlock'),
      canExecuteClearFormatting: editor.can().chain().focus().unsetAllMarks().run(),
    }),
  });

  return (
    <ToolbarSection
      editor={editor}
      actions={formatActions}
      activeActions={formatActions.map((action) => action.value)}
      mainActionCount={formatActions.length}
      dropdownIcon={<EllipsisIcon className="size-5" />}
      dropdownTooltip="More formatting"
      dropdownClassName="w-8"
      size={size}
      variant={variant}
    />
  );
};

SectionTextStyle.displayName = 'SectionTextStyle';

export default SectionTextStyle;

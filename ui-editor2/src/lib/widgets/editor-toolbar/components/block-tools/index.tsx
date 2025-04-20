import type {VariantProps} from 'class-variance-authority';
import {CodeIcon, QuoteIcon} from 'lucide-react';

import {cn} from '@shared/ui-theme';
import {type Editor, useEditorState} from '@tiptap/react';

import {ToolbarMenu} from '../../../../features';
import {toggleVariants} from '../../../../shared/shadcn';
import {InsertElement} from '../../types/block';

interface SectionExtraProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
}

export default function BlockTools({editor, size, variant}: SectionExtraProps) {
  const {isActiveBlockquote, isActiveCodeBlock, canExecuteBlockquote, canExecuteCodeBlock} =
    useEditorState({
      editor,
      selector: ({editor}: {editor: Editor}) => ({
        isActiveCodeBlock: editor.isActive('codeBlock'),
        isActiveBlockquote: editor.isActive('blockquote'),
        canExecuteCodeBlock: editor.can().chain().focus().toggleCodeBlock().run(),
        canExecuteBlockquote: editor.can().chain().focus().toggleBlockquote().run(),
      }),
    });
  const blockOptions: InsertElement[] = [
    {
      value: 'codeBlock',
      label: '코드 블록',
      icon: <CodeIcon className="size-5" />,
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: isActiveCodeBlock,
      canExecute: canExecuteCodeBlock,
      shortcuts: ['mod', 'alt', 'C'],
    },
    {
      value: 'blockquote',
      label: '인용문',
      icon: (
        <QuoteIcon
          className={cn(
            'size-5 fill-fg-900 stroke-none hover:stroke-none',
            isActiveBlockquote && 'fill-fg-white'
          )}
        />
      ),
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: isActiveBlockquote,
      canExecute: canExecuteBlockquote,
      shortcuts: ['mod', 'shift', 'B'],
    },
  ];
  return <ToolbarMenu actions={blockOptions} size={size} variant={variant} />;
}

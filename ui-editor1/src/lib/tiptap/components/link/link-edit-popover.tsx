import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  type toggleVariants,
} from '@kt-web-dev-package/ui-core';
import {type Editor, useEditorState} from '@tiptap/react';
import type {VariantProps} from 'class-variance-authority';
import {LinkIcon} from 'lucide-react';
import * as React from 'react';

import {ToolbarButton} from '../toolbar-button';
import {LinkEditBlock} from './link-edit-block';

interface LinkEditPopoverProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
}

const LinkEditPopover = ({editor, size, variant}: LinkEditPopoverProps) => {
  const editorState = useEditorState({
    editor,
    selector: ({editor}: {editor: Editor}) => ({
      isActiveLink: editor.isActive('link'),
      isActiveCodeBlock: editor.isActive('codeBlock'),
    }),
  });

  const [open, setOpen] = React.useState(false);

  const {from, to} = editor.state.selection;
  const text = editor.state.doc.textBetween(from, to, ' ');

  const onSetLink = React.useCallback(
    (url: string, text?: string, openInNewTab?: boolean) => {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .insertContent({
          type: 'text',
          text: text || url,
          marks: [
            {
              type: 'link',
              attrs: {
                href: url,
                target: openInNewTab ? '_blank' : '',
              },
            },
          ],
        })
        .setLink({href: url})
        .run();

      editor.commands.enter();
    },
    [editor]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ToolbarButton
          isActive={editorState.isActiveLink}
          tooltip="링크"
          aria-label="Insert link"
          disabled={editorState.isActiveCodeBlock}
          size={size}
          variant={variant}
        >
          <LinkIcon className="size-5" />
        </ToolbarButton>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-80" align="end" side="bottom">
        <LinkEditBlock onSave={onSetLink} defaultText={text} />
      </PopoverContent>
    </Popover>
  );
};

export {LinkEditPopover};

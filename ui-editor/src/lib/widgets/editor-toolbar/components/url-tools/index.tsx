import type {VariantProps} from 'class-variance-authority';
import {Link2Icon} from 'lucide-react';
import * as React from 'react';

import {type Editor, useEditorState} from '@tiptap/react';

import {
  PopoverContent as Content,
  Popover,
  PopoverTrigger as Trigger,
  type toggleVariants,
} from '../../../../shared/shadcn';
import {AppLinkEditBlock, AppToolbarButton} from '../../../../shared/ui';

interface UrlToolsProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
}

export default function UrlTools({editor, size, variant}: UrlToolsProps) {
  const {isActiveCodeBlock, isActiveLink} = useEditorState({
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
      <Trigger asChild>
        <AppToolbarButton
          isActive={isActiveLink}
          tooltip="링크"
          aria-label="Insert link"
          disabled={isActiveCodeBlock}
        >
          <Link2Icon className="size-5" />
        </AppToolbarButton>
      </Trigger>

      <Content className="w-full min-w-80" align="end" side="bottom">
        <AppLinkEditBlock onSave={onSetLink} defaultText={text} />
      </Content>
    </Popover>
  );
}

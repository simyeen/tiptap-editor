import type {VariantProps} from 'class-variance-authority';
import {VideoIcon} from 'lucide-react';
import * as React from 'react';

import {type Editor, useEditorState} from '@tiptap/react';

import {
  PopoverContent as Content,
  Popover,
  PopoverTrigger as Trigger,
  type toggleVariants,
} from '../../../../shared/shadcn';
import {AppToolbarButton} from '../../../../shared/ui';
import {ToolBlock} from './tool-block';

interface VideoLinkPopoverProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
}

export default function VideoTools({editor}: VideoLinkPopoverProps) {
  const [open, setOpen] = React.useState(false);
  const {isActiveYoutube, isActiveCodeBlock} = useEditorState({
    editor,
    selector: ({editor}: {editor: Editor}) => ({
      isActiveYoutube: editor.isActive('youtube'),
      isActiveCodeBlock: editor.isActive('codeBlock'),
    }),
  });

  const onSetVideoLink = React.useCallback(
    (url: string) => {
      editor
        .chain()
        .focus()
        .setYoutubeVideo({
          src: url,
        })
        .run();

      editor.commands.enter();
    },
    [editor]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Trigger asChild>
        <AppToolbarButton
          isActive={isActiveYoutube}
          tooltip="동영상"
          aria-label="Insert Video"
          disabled={isActiveCodeBlock}
        >
          <VideoIcon className="size-5" />
        </AppToolbarButton>
      </Trigger>

      <Content className="w-full min-w-80" align="end" side="bottom">
        <ToolBlock onSave={onSetVideoLink} />
      </Content>
    </Popover>
  );
}

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  type toggleVariants,
} from '@kt-web-dev-package/ui-core';
import type {Editor} from '@tiptap/react';
import type {VariantProps} from 'class-variance-authority';
import {SquarePlayIcon} from 'lucide-react';
import * as React from 'react';

import {ToolbarButton} from '../toolbar-button';
import {VideoLinkEditBlock} from './video-link-edit-block';

interface LinkEditPopoverProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
}

export function VideoLinkEditPopover({editor, size, variant}: LinkEditPopoverProps) {
  const [open, setOpen] = React.useState(false);

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
      <PopoverTrigger asChild>
        <ToolbarButton
          isActive={editor.isActive('youtube')}
          tooltip="동영상"
          aria-label="Insert Video"
          disabled={editor.isActive('codeBlock')}
          size={size}
          variant={variant}
        >
          <SquarePlayIcon className="size-5" />
        </ToolbarButton>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-80" align="end" side="bottom">
        <VideoLinkEditBlock onSave={onSetVideoLink} />
      </PopoverContent>
    </Popover>
  );
}

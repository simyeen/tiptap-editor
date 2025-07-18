import {Separator} from '@kt-web-dev-package/ui-core';
import {CopyIcon, ExternalLinkIcon, Link2OffIcon} from 'lucide-react';
import * as React from 'react';

import {ToolbarButton} from '../toolbar-button';

interface LinkPopoverBlockProps {
  url: string;
  onClear: () => void;
  onEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const LinkPopoverBlock: React.FC<LinkPopoverBlockProps> = ({url, onClear, onEdit}) => {
  const [copyTitle, setCopyTitle] = React.useState<string>('링크 복사');

  const handleCopy = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setCopyTitle('복사됨!');
          setTimeout(() => setCopyTitle('링크 복사'), 1000);
        })
        .catch(() => {
          // Handle the error appropriately here
        });
    },
    [url]
  );

  const handleOpenLink = React.useCallback(() => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [url]);

  return (
    <div className="flex h-10 overflow-hidden rounded bg-background p-2 shadow-lg">
      <div className="inline-flex items-center gap-1">
        <ToolbarButton tooltip="링크 수정" onClick={onEdit} className="w-auto px-2">
          링크 수정
        </ToolbarButton>
        <Separator orientation="vertical" />
        <ToolbarButton tooltip="새로운 탭에서 링크 열기" onClick={handleOpenLink}>
          <ExternalLinkIcon className="size-4" />
        </ToolbarButton>
        <Separator orientation="vertical" />
        <ToolbarButton tooltip="링크 삭제" onClick={onClear}>
          <Link2OffIcon className="size-4" />
        </ToolbarButton>
        <Separator orientation="vertical" />
        <ToolbarButton
          tooltip={copyTitle}
          onClick={handleCopy}
          tooltipOptions={{
            onPointerDownOutside: (e) => {
              if (e.target === e.currentTarget) e.preventDefault();
            },
          }}
        >
          <CopyIcon className="size-4" />
        </ToolbarButton>
      </div>
    </div>
  );
};

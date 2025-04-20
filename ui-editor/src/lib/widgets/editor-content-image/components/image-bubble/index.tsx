import {EllipsisIcon} from 'lucide-react';
import * as React from 'react';

import {
  Button,
  TooltipContent as Content,
  DropdownMenu,
  DropdownMenuContent as MenuContent,
  DropdownMenuItem as MenuItem,
  DropdownMenuTrigger as MenuTrigger,
  Tooltip,
  TooltipTrigger as Trigger,
} from '../../../../shared/shadcn';
import {AppImageBubbleButton, AppImageBubbleWrapper} from '../../../../shared/ui';
import {BubbleOptions} from './bubble-options';

interface ImageBubbleProps {
  shouldMerge?: boolean;
  isLink?: boolean;
  editable?: boolean;
  onView?: () => void;
  onDownload?: () => void;
  onCopy?: () => void;
  onCopyLink?: () => void;
  onAlignLeft?: () => void;
  onAlignCenter?: () => void;
  onAlignRight?: () => void;
}

export const ImageBubble: React.FC<ImageBubbleProps> = React.memo(
  ({shouldMerge = false, isLink = false, editable, ...actions}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleAction = React.useCallback(
      (e: React.MouseEvent, action: (() => void) | undefined) => {
        e.preventDefault();
        e.stopPropagation();
        action?.();
      },
      []
    );

    const filteredActions = React.useMemo(
      () =>
        BubbleOptions.filter((item) => (isLink || !item.isLink) && (editable || !item.editable)),
      [isLink]
    );

    return (
      <AppImageBubbleWrapper className="">
        <div className="flex w-full">
          {!shouldMerge ? (
            filteredActions.map(({key, icon, tooltip}) => (
              <AppImageBubbleButton
                key={key}
                icon={icon}
                tooltip={tooltip}
                onClick={(e) => handleAction(e, actions[key])}
              />
            ))
          ) : (
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <MenuTrigger asChild>
                <AppImageBubbleButton
                  icon={<EllipsisIcon className="size-4" />}
                  tooltip="Open menu"
                  onClick={(e) => e.preventDefault()}
                />
              </MenuTrigger>

              <MenuContent className="w-56" align="end">
                {filteredActions.map(({key, icon, tooltip}) => (
                  <MenuItem key={key} onClick={(e) => handleAction(e, actions[key])}>
                    <div className="flex flex-row items-center gap-2">
                      {icon}
                      <span>{tooltip}</span>
                    </div>
                  </MenuItem>
                ))}
              </MenuContent>
            </DropdownMenu>
          )}
        </div>
      </AppImageBubbleWrapper>
    );
  }
);

ImageBubble.displayName = 'ImageBubble';

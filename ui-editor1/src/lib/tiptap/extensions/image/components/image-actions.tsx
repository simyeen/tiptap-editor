import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  cn,
} from '@kt-web-dev-package/ui-core';
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ClipboardCopyIcon,
  DownloadIcon,
  EllipsisIcon,
  LinkIcon,
  Maximize2Icon,
} from 'lucide-react';
import * as React from 'react';

interface ImageActionsProps {
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

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  tooltip: string;
}

export const ActionWrapper = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({children, className, ...props}, ref) => (
      <div
        ref={ref}
        className={cn(
          'absolute right-3 top-3 flex flex-row rounded px-0.5 opacity-0 group-hover/node-image:opacity-100',
          'border-[0.5px] bg-[var(--mt-bg-secondary)] [backdrop-filter:saturate(1.8)_blur(20px)]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  )
);

ActionWrapper.displayName = 'ActionWrapper';

export const ActionButton = React.memo(
  React.forwardRef<HTMLButtonElement, ActionButtonProps>(
    ({icon, tooltip, className, ...props}, ref) => (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            ref={ref}
            variant="ghost"
            className={cn(
              'relative flex h-7 w-7 flex-row rounded-none p-0 text-muted-foreground hover:text-foreground',
              'bg-transparent hover:bg-transparent',
              className
            )}
            {...props}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">{tooltip}</TooltipContent>
      </Tooltip>
    )
  )
);

ActionButton.displayName = 'ActionButton';

type ActionKey =
  | 'onView'
  | 'onDownload'
  | 'onCopy'
  | 'onCopyLink'
  | 'onAlignLeft'
  | 'onAlignCenter'
  | 'onAlignRight';

const ActionItems: Array<{
  key: ActionKey;
  icon: React.ReactNode;
  tooltip: string;
  isLink?: boolean;
  editable?: boolean;
}> = [
  {key: 'onView', icon: <Maximize2Icon className="size-4" />, tooltip: '사진 보기'},
  {key: 'onDownload', icon: <DownloadIcon className="size-4" />, tooltip: '사진 다운로드'},
  // {
  //   key: 'onCopy',
  //   icon: <ClipboardCopyIcon className="size-4" />,
  //   tooltip: '클립보드에 사진복사',
  // },
  {
    key: 'onCopyLink',
    icon: <LinkIcon className="size-4" />,
    tooltip: '사진 링크 복사',
    isLink: true,
  },
  {
    key: 'onAlignLeft',
    icon: <AlignLeftIcon className="size-4" />,
    tooltip: '왼쪽 정렬',
    editable: true,
  },
  {
    key: 'onAlignCenter',
    icon: <AlignCenterIcon className="size-4" />,
    tooltip: '가운데 정렬',
    editable: true,
  },
  {
    key: 'onAlignRight',
    icon: <AlignRightIcon className="size-4" />,
    tooltip: '오른쪽 정렬',
    editable: true,
  },
];

export const ImageActions: React.FC<ImageActionsProps> = React.memo(
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
      () => ActionItems.filter((item) => (isLink || !item.isLink) && (editable || !item.editable)),
      [isLink]
    );

    return (
      <ActionWrapper className={cn({'opacity-100': isOpen})}>
        {shouldMerge ? (
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <ActionButton
                icon={<EllipsisIcon className="size-4" />}
                tooltip="Open menu"
                onClick={(e) => e.preventDefault()}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              {filteredActions.map(({key, icon, tooltip}) => (
                <DropdownMenuItem key={key} onClick={(e) => handleAction(e, actions[key])}>
                  <div className="flex flex-row items-center gap-2">
                    {icon}
                    <span>{tooltip}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          filteredActions.map(({key, icon, tooltip}) => (
            <ActionButton
              key={key}
              icon={icon}
              tooltip={tooltip}
              onClick={(e) => handleAction(e, actions[key])}
            />
          ))
        )}
      </ActionWrapper>
    );
  }
);

ImageActions.displayName = 'ImageActions';

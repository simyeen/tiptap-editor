import * as React from 'react';

import {cn} from '@shared/ui-theme';

import {Button, Tooltip, TooltipContent, TooltipTrigger} from '../shadcn';

interface BubbleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  tooltip: string;
}

export const AppImageBubbleButton = React.memo(
  React.forwardRef<HTMLButtonElement, BubbleButtonProps>(
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

AppImageBubbleButton.displayName = 'AppImageBubbleButton';

export default AppImageBubbleButton;

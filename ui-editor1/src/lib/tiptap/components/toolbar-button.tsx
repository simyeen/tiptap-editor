import {Toggle, Tooltip, TooltipContent, TooltipTrigger, cn} from '@kt-web-dev-package/ui-core';
import type {TooltipContentProps} from '@radix-ui/react-tooltip';
import * as React from 'react';

interface ToolbarButtonProps extends React.ComponentPropsWithoutRef<typeof Toggle> {
  isActive?: boolean;
  tooltip?: string;
  tooltipOptions?: TooltipContentProps;
}

export const ToolbarButton = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({isActive, children, tooltip, className, tooltipOptions, ...props}, ref) => {
    const toggleButton = (
      <Toggle
        size="sm"
        ref={ref}
        className={cn('hover:bg-fg-100 size-8 p-0', {'bg-fg-900 text-white': isActive}, className)}
        {...props}
      >
        {children}
      </Toggle>
    );

    if (!tooltip) {
      return toggleButton;
    }

    return (
      <Tooltip delayDuration={1000}>
        <TooltipTrigger asChild>{toggleButton}</TooltipTrigger>
        <TooltipContent {...tooltipOptions}>
          <div className="flex flex-col items-center text-center">{tooltip}</div>
        </TooltipContent>
      </Tooltip>
    );
  }
);

ToolbarButton.displayName = 'ToolbarButton';

export default ToolbarButton;

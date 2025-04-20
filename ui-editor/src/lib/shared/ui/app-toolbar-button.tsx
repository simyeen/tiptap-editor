import * as React from 'react';

import type {TooltipContentProps} from '@radix-ui/react-tooltip';
import {cn} from '@shared/ui-theme';

import {TooltipContent as Content, Toggle, Tooltip, TooltipTrigger as Trigger} from '../shadcn';

interface AppToolbarButtonProps extends React.ComponentPropsWithoutRef<typeof Toggle> {
  isActive?: boolean;
  tooltip?: string;
  tooltipOptions?: TooltipContentProps;
}

export const AppToolbarButton = React.forwardRef<HTMLButtonElement, AppToolbarButtonProps>(
  ({isActive, children, tooltip, className, tooltipOptions, ...props}, ref) => {
    const toggleButton = (
      <Toggle
        size="sm"
        ref={ref}
        className={cn('size-8 p-0 hover:bg-fg-100', {'bg-fg-900 text-white': isActive}, className)}
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
        <Trigger asChild>{toggleButton}</Trigger>

        <Content {...tooltipOptions}>
          <div className="flex flex-col items-center text-center">{tooltip}</div>
        </Content>
      </Tooltip>
    );
  }
);

export default AppToolbarButton;

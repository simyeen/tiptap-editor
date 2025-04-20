import * as React from 'react';

import {cn} from '@shared/ui-theme';

import {Separator} from '../../../shared/shadcn';
import {TableToolbarButtonProps} from '../../../shared/types';
import {AppToolbarButton} from '../../../shared/ui';

interface LinkBubbleBlockProps {
  tableToolbarButtons: TableToolbarButtonProps[];
}

// TODO: index로 통합해버리면 될듯
export const BubbleBlock: React.FC<LinkBubbleBlockProps> = ({tableToolbarButtons}) => {
  return (
    <div className="flex h-10 w-full rounded bg-background p-2 shadow-lg">
      <div className="flex grow items-center gap-1">
        {tableToolbarButtons.map(
          ({tooltip, icon, onClick, hasDivider, disabled, isActive}, idx) => {
            return (
              <React.Fragment key={tooltip}>
                <AppToolbarButton
                  tooltip={tooltip}
                  onClick={onClick}
                  disabled={disabled}
                  isActive={isActive}
                  className={cn({
                    'text-fg-100': disabled,
                  })}
                >
                  {icon}
                </AppToolbarButton>

                {hasDivider && <Separator orientation="vertical" />}
              </React.Fragment>
            );
          }
        )}
      </div>
    </div>
  );
};

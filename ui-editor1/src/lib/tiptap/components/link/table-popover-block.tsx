import {Separator} from '@kt-web-dev-package/ui-core';
import * as React from 'react';

import {TableToolbarButtonProps} from '../bubble-menu';
import {ToolbarButton} from '../toolbar-button';

interface LinkPopoverBlockProps {
  tableToolbarButtons: TableToolbarButtonProps[];
}

export const TablePopoverBlock: React.FC<LinkPopoverBlockProps> = ({tableToolbarButtons}) => {
  return (
    <div className="flex h-10 w-full rounded bg-background p-2 shadow-lg">
      <div className="flex grow items-center gap-1">
        {tableToolbarButtons.map(
          ({tooltip, icon, onClick, hasDivider, disabled, isActive}, idx) => {
            return (
              <React.Fragment key={tooltip}>
                <ToolbarButton
                  tooltip={tooltip}
                  onClick={onClick}
                  disabled={disabled}
                  isActive={isActive}
                  className={cn({
                    'text-fg-100': disabled,
                  })}
                >
                  {icon}
                </ToolbarButton>
                {hasDivider && <Separator orientation="vertical" />}
              </React.Fragment>
            );
          }
        )}
      </div>
    </div>
  );
};

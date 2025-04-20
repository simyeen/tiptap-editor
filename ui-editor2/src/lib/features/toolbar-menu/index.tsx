import type {VariantProps} from 'class-variance-authority';

import {type toggleVariants} from '../../shared/shadcn';
import {FormatAction} from '../../shared/types';
import {AppToolbarButton} from '../../shared/ui';
import {getShortcutKey} from '../../shared/utils';

interface ToolbarMenuProps extends VariantProps<typeof toggleVariants> {
  actions: FormatAction[];
}

export default function ToolbarMenu({actions, size, variant}: ToolbarMenuProps) {
  return (
    <>
      {actions.map(
        (action: FormatAction) => (
          <AppToolbarButton
            className="min-w-8"
            key={action.label}
            onClick={action.action}
            disabled={!action.canExecute}
            isActive={action.isActive}
            tooltip={`${action.label} ${action.shortcuts.map((s) => getShortcutKey(s).symbol).join(' ')}`}
            aria-label={action.label}
            size={size}
            variant={variant}
          >
            {action.icon}
          </AppToolbarButton>
        ),
        [size, variant]
      )}
    </>
  );
}

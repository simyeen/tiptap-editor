import * as React from 'react';

import {cn} from '@shared/ui-theme';

import {Spinner} from '../../../shared/shadcn';

export const ImageLoading = React.memo(() => {
  return (
    <div
      className={cn(
        'flex flex-row items-center justify-center',
        'absolute inset-0 rounded bg-[var(--mt-overlay)] opacity-100 transition-opacity'
      )}
    >
      <Spinner className="size-7" />
    </div>
  );
});

ImageLoading.displayName = 'ImageLoading';

'use client';

import * as React from 'react';

import {cn} from '@shared/ui-theme';

export const AppImageBubbleWrapper = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({children, className, ...props}, ref) => (
      <div
        ref={ref}
        className={cn(
          'absolute left-1/2 top-5 flex flex-row rounded px-0.5 opacity-0 group-hover/node-image:opacity-100',
          '-translate-x-1/2 -translate-y-1/2 transform', // 중앙 정렬을 위한 transform 추가
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

AppImageBubbleWrapper.displayName = 'AppImageBubbleWrapper';

export default AppImageBubbleWrapper;

import {useEffect, useRef, useState} from 'react';

export function useResizeObserver() {
  const [toolbarHeight, setToolbarHeight] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setToolbarHeight(entry.borderBoxSize[0].blockSize);
        }
      });
      observer.observe(divRef.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [divRef.current]);

  return {toolbarHeight, divRef};
}

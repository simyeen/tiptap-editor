import {AlignCenter, AlignLeft, AlignRight} from 'lucide-react';

import {ICON_STROKE_WIDTH} from '../../../shared/constant';

interface AlignButtonProps {
  handleAlign: (align: 'left' | 'center' | 'right') => void;
}

export default function AlignButton({handleAlign}: AlignButtonProps) {
  return (
    <div className="absolute left-0 right-0 top-0 flex items-center justify-center p-2">
      <div className="flex rounded-sm bg-white opacity-70">
        <button
          onClick={() => handleAlign('left')}
          className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 transition-colors hover:text-black hover:opacity-100"
        >
          <AlignLeft className="size-4" strokeWidth={ICON_STROKE_WIDTH} />
        </button>
        <button
          onClick={() => handleAlign('center')}
          className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 transition-colors hover:text-black hover:opacity-100"
        >
          <AlignCenter className="size-4" strokeWidth={ICON_STROKE_WIDTH} />
        </button>
        <button
          onClick={() => handleAlign('right')}
          className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 transition-colors hover:text-black hover:opacity-100"
        >
          <AlignRight className="size-4" strokeWidth={ICON_STROKE_WIDTH} />
        </button>
      </div>
    </div>
  );
}

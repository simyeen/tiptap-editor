import {cn} from '@kt-web-dev-package/ui-core';

export default function Chip({
  selected,
  id,
  label,
  onDismiss,
  className,
}: {
  id: string;
  selected?: boolean;
  label: string;
  onDismiss?: (id: string) => Promise<void> | void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        selected ? 'bg-fg-400' : 'bg-fg-200',
        'relative inline-flex w-auto cursor-pointer items-center gap-1 rounded-full py-[5px] pl-2.5 pr-2 align-middle shadow',
        className
      )}
    >
      <p className="text-sz-lg-bold text-fg-700 flex-grow">{`#${label}`}</p>

      {onDismiss && (
        <button
          onClick={() => onDismiss(id)}
          className="flex rounded-full bg-transparent align-middle text-lg text-gray-400 hover:scale-105 hover:border-transparent hover:text-gray-600"
        >
          <span>×</span>
        </button>
      )}
    </div>
  );
}

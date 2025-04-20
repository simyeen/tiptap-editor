interface ButtonProps {
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

export default function Button({className, disabled = false, children, onClick}: ButtonProps) {
  return (
    <div className="flex h-auto items-center justify-center rounded-md">
      <button
        disabled={disabled}
        onClick={onClick}
        className={`${className} flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-fg-100 hover:text-gray-500`}
      >
        {children}
      </button>
    </div>
  );
}

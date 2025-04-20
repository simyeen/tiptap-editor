import React from 'react';

interface ImageResizerProps {
  handleMouseDown: (event: React.MouseEvent) => void;
}

const ImageResizer = ({handleMouseDown}: ImageResizerProps) => {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center border-2 border-black">
      {/* 네 모서리에 둥근 핸들 추가 */}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position) => (
        <div
          key={position}
          className={`pointer-events-auto absolute z-20 h-4 w-4 cursor-pointer rounded-full border-2 border-black bg-white shadow-md ${
            position === 'top-left'
              ? 'left-[-8px] top-[-8px]'
              : position === 'top-right'
                ? 'right-[-8px] top-[-8px]'
                : position === 'bottom-left'
                  ? 'bottom-[-8px] left-[-8px]'
                  : 'bottom-[-8px] right-[-8px]'
          }`}
          onMouseDown={handleMouseDown}
        />
      ))}
    </div>
  );
};

export default ImageResizer;

import {useEffect, useRef, useState} from 'react';

interface UseImageResize {
  initWidth: number; // 초기 너비
  initHeight: number; // 초기 높이
}

export default function useImageResize({initWidth, initHeight}: UseImageResize) {
  const [resizedWidth, setResizedWidth] = useState(initWidth);
  const [resizedHeight, setResizedHeight] = useState(initHeight);
  const isResizing = useRef(false);

  // 드래그 시작
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
  };

  // 드래그 중 (이미지 크기 조절)
  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing.current) {
      setResizedWidth((prev) => Math.max(50, prev + e.movementX)); // 최소 크기 제한
      setResizedHeight((prev) => Math.max(50, prev + e.movementY));
    }
  };

  // 드래그 종료
  const handleMouseUp = () => {
    isResizing.current = false;
  };

  // 이벤트 리스너 추가
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return {resizedWidth, resizedHeight, handleMouseDown};
}

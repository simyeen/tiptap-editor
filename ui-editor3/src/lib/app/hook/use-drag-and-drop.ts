import {useEffect} from 'react';

import {Editor} from '@tiptap/react';

interface UseDragAndDropProps {
  editor: Editor | null;
  editorDivRef: React.RefObject<HTMLDivElement>;
}

export default function useDragAndDrop({editor, editorDivRef}: UseDragAndDropProps) {
  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  // drop시 이미지 삽입
  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];

    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    const _options = {
      src: imageUrl,
      alt: '내 이미지',
      title: '이미지 이름',
    };

    editor?.chain().focus().setImage(_options).run();
  };

  useEffect(() => {
    const editorElement = editorDivRef.current;

    if (editorElement) {
      editorElement.addEventListener('dragover', handleDragOver);
      editorElement.addEventListener('drop', handleDrop);

      return () => {
        editorElement.removeEventListener('dragover', handleDragOver);
        editorElement.removeEventListener('drop', handleDrop);
      };
    }
  }, [editor, editorDivRef]);
}

import {useEffect} from 'react';

import {Editor} from '@tiptap/react';

interface UseEditorChangeProps {
  editor: Editor | null;
  onChange: () => void;
}

export default function UseEditorChange({editor, onChange}: UseEditorChangeProps) {
  useEffect(() => {
    if (!editor || !onChange) return;

    const handleUpdate = () => {
      onChange();
    };

    editor.on('update', handleUpdate);
    return () => {
      editor.off('update', handleUpdate);
    };
  }, [editor, onChange]);
}

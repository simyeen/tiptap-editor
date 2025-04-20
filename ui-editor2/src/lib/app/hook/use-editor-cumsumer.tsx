import {useEffect} from 'react';

import {Editor, useCurrentEditor} from '@tiptap/react';

interface EditorConsumerComponentProps {
  setEditor: (editor: Editor) => void;
  editable: boolean;
}

export default function EditorConsumerComponent({
  setEditor,
  editable,
}: EditorConsumerComponentProps) {
  const {editor} = useCurrentEditor();

  useEffect(() => {
    if (editor) {
      setEditor(editor);
      editor.setEditable(editable);
    }
  }, [editor, setEditor, editable]);

  return null;
}

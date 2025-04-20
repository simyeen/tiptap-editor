import {BubbleMenu} from '@tiptap/react';

import {EditorProps} from '../../../shared/types';
import {useTableEditorState} from '../hooks/use-editor-state';
import {BubbleBlock} from './bubble-block';
import {BubbleOptions} from './bubble-options';

export default function TableBubbleMenu({editor}: EditorProps) {
  const editorState = useTableEditorState(editor);
  const tableToolbarButtons = BubbleOptions(editor, editorState);

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={() => editor.isActive('table')}
      tippyOptions={{
        maxWidth: '100%',
        placement: 'bottom',
        zIndex: 5,
      }}
    >
      <BubbleBlock tableToolbarButtons={tableToolbarButtons} />
    </BubbleMenu>
  );
}

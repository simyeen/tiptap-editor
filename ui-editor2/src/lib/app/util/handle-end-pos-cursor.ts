import {Editor} from '@tiptap/react';

interface HandleEndPosCursorProps {
  editor: Editor | null;
}

export function handleEndPosCursor({editor}: HandleEndPosCursorProps) {
  if (!editor) return;

  const doc = editor.state.doc;
  const lastNode = doc.lastChild;

  const isLastNodeImageOrTable = lastNode?.type.name === 'image' || lastNode?.type.name === 'table';

  if (isLastNodeImageOrTable) {
    const endPos = doc.content.size;
    const paragraphNode = editor.schema.nodes.paragraph.create();
    const tr = editor.state.tr.insert(endPos, paragraphNode);

    editor.view.dispatch(tr);
  }
}

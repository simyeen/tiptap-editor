import {useImperativeHandle} from 'react';

import {Editor} from '@tiptap/react';

import {useContentStore} from '../../entities/content/store';
import {EditorHandler} from '../type';

interface EditorHandlerProps {
  editor: Editor | null;
  ref: React.Ref<EditorHandler>;
}

export default function useEditorHandler({editor, ref}: EditorHandlerProps) {
  const selectedImage = useContentStore((state) => state.selectedImage);

  useImperativeHandle(ref, () => ({
    getHTML: () => editor?.getHTML() || '',
    getJSON: () => editor?.getJSON() || {},
    getText: () => editor?.getText() || '',
    getThumbnail: () => selectedImage || '',
  }));

  return null;
}

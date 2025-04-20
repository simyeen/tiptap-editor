import {useEffect} from 'react';

import {useEditor} from '@tiptap/react';

import {extensionConfigure} from '../extensions';

export interface EditorContent {
  content: string;
  original_content: string;
}
export interface usePostEditorProps {
  editable: boolean;
  content: string;
  onContentChange?: (newContent: EditorContent) => void;
  onContentBlur?: () => void;
  placeholder?: string;
  handleServerImageUpload?: (file: File) => Promise<Record<string, string>[]>;
  thumb?: {
    thumbnailUrl: string;
    onThumbnailUrlChange: (newThumbnailUrl: string) => void;
  };
}

export default function useArticleEditor({
  editable,
  placeholder,
  handleServerImageUpload,
  content,
  onContentChange,
  onContentBlur,
  thumb,
}: usePostEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editable,
    content,
    editorProps: {
      // scrollMargin: 192 + (toolbarHeight ? toolbarHeight : 0),
      // scrollThreshold: 192 + (toolbarHeight ? toolbarHeight : 0),
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        class: 'space-y-2.5',
      },
    },

    extensions: extensionConfigure({
      placeholder: placeholder || '',
      thumbnailUrl: thumb?.thumbnailUrl,
      onThumbnailUrlChange: thumb?.onThumbnailUrlChange,
      handleServerImageUpload,
    }),

    onUpdate: ({editor}) => {
      onContentChange?.({
        content: editor.getHTML(),
        original_content: editor.getText(),
      });
    },

    onCreate: () => {},
    onBlur: () => onContentBlur?.(),
  });

  useEffect(() => {
    if (editor && content) {
      queueMicrotask(() => editor.commands.setContent(content));
    }
  }, [editor, content]);

  return editor;
}

import {useEffect} from 'react';

import {TooltipProvider} from '../shared/shadcn';
import Components from './components';
import usePostEditor, {usePostEditorProps} from './hooks/use-article-editor';

interface EditorProps extends usePostEditorProps {
  isError?: boolean;
  children?: React.ReactNode;
}

export function PostEditor({
  editable,
  placeholder,
  handleServerImageUpload,
  content,
  onContentChange,
  onContentBlur,
  thumb,
  isError,
  children,
}: EditorProps) {
  const editor = usePostEditor({
    editable,
    placeholder,
    handleServerImageUpload,
    content,
    onContentChange,
    onContentBlur,
    thumb,
  });

  useEffect(() => {
    if (thumb?.thumbnailUrl) editor?.commands.setBlogThumbnailUrl(thumb?.thumbnailUrl);
  }, [thumb?.thumbnailUrl]);

  if (!editor) {
    return null;
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Components {...{editor, editable, isError, handleServerImageUpload}}>{children}</Components>
    </TooltipProvider>
  );
}

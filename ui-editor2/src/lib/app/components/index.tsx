import * as React from 'react';

import {cn} from '@shared/ui-theme';
import {Editor} from '@tiptap/core';
import {EditorContent} from '@tiptap/react';

import {EditorBubbleLink, EditorBubbleTable, EditorToolbar} from '../../widgets';
import '../global.scss';
import {useResizeObserver} from '../hooks/use-resize-observer';
import {EditorWrapper} from './editor-wrapper';

interface ComponentsProps {
  editable: boolean | undefined;
  isError: boolean | undefined;
  editor: Editor;
  handleServerImageUpload?: (file: File) => Promise<Record<string, string>[]>;
  children?: React.ReactNode;
}

export default function Components({
  editor,
  editable = false,
  isError,
  handleServerImageUpload,
  children,
}: ComponentsProps) {
  const {divRef} = useResizeObserver();
  return (
    <EditorWrapper
      as="div"
      name="editor"
      className="flex h-[500px] w-full flex-col border-0 border-transparent"
    >
      {editable && (
        <div className="top-[192px] z-10 shrink-0 overflow-x-auto bg-fg-white" ref={divRef}>
          <EditorToolbar
            editor={editor}
            isError={isError}
            handleServerImageUpload={handleServerImageUpload}
          />
        </div>
      )}

      <EditorContent
        editor={editor}
        className={cn(
          'article-editor scroll grow overflow-y-auto scrollbar-hide',
          'article-editor scroll grow overflow-y-auto scrollbar-hide',
          {
            'max-h-[600px] min-h-[450px] border border-y-0 border-input p-5': editable,
          },
          {
            'border-x border-fg-point': isError,
          }
        )}
      />

      {editable && (
        <>
          <EditorBubbleLink editor={editor} />

          <EditorBubbleTable editor={editor} />

          {children}
        </>
      )}
    </EditorWrapper>
  );
}

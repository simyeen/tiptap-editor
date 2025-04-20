import {Separator, cn} from '@kt-web-dev-package/ui-core';
import type {Content} from '@tiptap/react';
import {EditorContent} from '@tiptap/react';
import * as React from 'react';

import {Toolbar} from '../components';
import {LinkBubbleMenu, TableBubbleMenu} from '../components/bubble-menu/';
import ChipListInput from '../components/chip-list-input';
import {MeasuredContainer} from '../components/measured-container';
import type {UseMinimalTiptapEditorProps} from '../hooks/use-minimal-tiptap';
import useMinimalTiptapEditor from '../hooks/use-minimal-tiptap';
import '../styles/index.css';

export interface MinimalTiptapProps extends Omit<UseMinimalTiptapEditorProps, 'onUpdate'> {
  value?: Content;
  onChange?: ({content, original_content}: {content: string; original_content: string}) => void;
  className?: string;
  editorContentClassName?: string;
  setTags?: (tags: string[]) => void;
  handleUpload?: (file: File) => Promise<Record<string, string>[]>;
}

export const MinimalTiptapEditor = React.forwardRef<HTMLDivElement, MinimalTiptapProps>(
  (
    {value, onChange, className, editorContentClassName, editable, setTags, handleUpload, ...props},
    ref
  ) => {
    const [toolbarHeight, setToolbarHeight] = React.useState(0);
    const divRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (divRef.current) {
        const observer = new ResizeObserver((entries) => {
          for (const entry of entries) {
            setToolbarHeight(entry.borderBoxSize[0].blockSize);
          }
        });
        observer.observe(divRef.current);
        return () => {
          observer.disconnect();
        };
      }
    }, [divRef.current]);

    const editor = useMinimalTiptapEditor({
      value,
      onChange,
      editable,
      immediatelyRender: false,
      shouldRerenderOnTransaction: false,
      placeholder: '내용을 입력해주세요.',
      handleUpload,
      toolbarHeight,
      ...props,
    });

    if (!editor) {
      return null;
    }

    return (
      <MeasuredContainer
        as="div"
        name="editor"
        ref={ref}
        className={cn('flex w-full min-w-[312px] flex-col border-0 border-transparent', className)}
      >
        {editable && (
          <div
            className="bg-fg-white sticky top-[192px] z-10 shrink-0 overflow-x-auto"
            ref={divRef}
          >
            <Toolbar editor={editor} />
          </div>
        )}
        <EditorContent
          editor={editor}
          className={cn(
            'minimal-tiptap-editor grow',
            {
              'min-h-[508px] border border-y-0 border-input p-5': editable,
            },
            editorContentClassName
          )}
        />
        {editable && (
          <>
            <LinkBubbleMenu editor={editor} />
            <TableBubbleMenu editor={editor} />
            <ChipListInput setTags={setTags} />
          </>
        )}
      </MeasuredContainer>
    );
  }
);

MinimalTiptapEditor.displayName = 'MinimalTiptapEditor';

export default MinimalTiptapEditor;

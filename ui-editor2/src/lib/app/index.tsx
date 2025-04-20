import {forwardRef, useRef, useState} from 'react';

import {Editor, EditorProvider} from '@tiptap/react';

import {BubbleTable, Footer, Toolbar} from '../widgets';
import {EDITOR_DEFAULT_CONTAINER_PROPS, EDITOR_DEFAULT_WRAPPER_STYLE} from './constant';
import Extensions from './extensions';
import './global.scss';
import {EditorCumsumerComponent, useEditorChange} from './hook';
import {useDragAndDrop, useEditorHandler} from './hook';
import {EditorHandler, EditorProps} from './type';
import {handleEndPosCursor} from './util';

const Editor2 = forwardRef<EditorHandler, EditorProps>(
  (
    {
      content = '',
      editable = true,
      placeholder = '',
      footer = <Footer />,
      editorWrapperStyle = EDITOR_DEFAULT_WRAPPER_STYLE,
      editorContainerProps = EDITOR_DEFAULT_CONTAINER_PROPS,
      onChange = () => {},
    }: EditorProps,
    ref
  ) => {
    const [editor, setEditor] = useState<Editor | null>(null);
    const editorDivRef = useRef<HTMLDivElement | null>(null);
    const extensions = Extensions({placeholder});

    useEditorHandler({editor, ref});
    useDragAndDrop({editor, editorDivRef});
    useEditorChange({editor, onChange});

    return (
      <div
        ref={editorDivRef}
        onClick={() => {
          editor?.commands.focus();
          handleEndPosCursor({editor});
        }}
        className={editable ? editorWrapperStyle : ''}
      >
        <EditorProvider
          editable={editable}
          extensions={extensions}
          editorContainerProps={editable ? editorContainerProps : {}}
          slotBefore={editable && <Toolbar />}
          slotAfter={editable && footer}
          content={content}
        >
          <EditorCumsumerComponent setEditor={setEditor} editable={editable} />
          <BubbleTable />
        </EditorProvider>
      </div>
    );
  }
);

export default Editor2;

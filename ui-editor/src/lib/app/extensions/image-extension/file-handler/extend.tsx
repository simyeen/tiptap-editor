// image drag-and-drop을 담당
import {PluginKey} from '@tiptap/pm/state';
import {type Editor, Extension, ReactNodeViewRenderer} from '@tiptap/react';

import {FileValidationOptions} from '../../../../shared/types';
import {EditorContentImage} from '../../../../widgets';
import {HandleUploadProps} from '../../../types/share';
import {FileHandlerPlugin} from './plugin';

export type FileHandlePluginOptions = {
  key?: PluginKey;
  editor: Editor;
} & FileValidationOptions;

export const ExtendedFileHandler = (props: HandleUploadProps) =>
  Extension.create<Omit<FileHandlePluginOptions, 'key' | 'editor'>>({
    name: 'fileHandler',

    addNodeView() {
      return ReactNodeViewRenderer((props) => <EditorContentImage {...props} />, {
        className: 'block-node',
      });
    },

    addAttributes() {
      return {
        id: {default: null},
        src: {default: null},
        alt: {default: null},
        title: {default: null},
        width: {default: null},
        height: {default: null},
        fileName: {default: null},
        custom_thumbnail_url: {
          default: null,
        },
      };
    },

    addOptions() {
      return {
        allowBase64: false,
        allowedMimeTypes: [],
        maxFileSize: 0,
      };
    },

    addProseMirrorPlugins() {
      return [
        FileHandlerPlugin({
          key: new PluginKey(this.name),
          editor: this.editor,
          props,
          ...this.options,
        }),
      ];
    },
  });

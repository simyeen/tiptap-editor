import {Plugin, PluginKey} from '@tiptap/pm/state';
import {type Editor} from '@tiptap/react';

import {FileValidationOptions} from '../../../../shared/types';
import {HandleUploadProps} from '../../../types/share';
import handleFileList from './handle-file-list';

type FileHandlePluginOptions = {
  key?: PluginKey;
  editor: Editor;
  props: HandleUploadProps;
} & FileValidationOptions;

//
export const FileHandlerPlugin = (options: FileHandlePluginOptions) => {
  const {key, editor, props, allowedMimeTypes, maxFileSize, allowBase64} = options;
  const {handleServerImageUpload} = props;

  return new Plugin({
    key: key || new PluginKey('fileHandler'),

    props: {
      handleDrop(view, event) {
        event.preventDefault();
        event.stopPropagation();

        const {dataTransfer} = event;
        if (!dataTransfer?.files.length) return;
        handleFileList({
          options: {allowBase64, maxFileSize, allowedMimeTypes},
          editor: editor,
          handleServerImageUpload,
          files: Array.from(dataTransfer.files),
        });
      },

      handlePaste(_, event) {
        event.preventDefault();
        event.stopPropagation();

        const {clipboardData} = event;

        if (!clipboardData?.files.length) {
          return;
        }
        handleFileList({
          options: {allowBase64, maxFileSize, allowedMimeTypes},
          editor,
          handleServerImageUpload,
          files: Array.from(clipboardData.files),
        });
      },
    },
  });
};

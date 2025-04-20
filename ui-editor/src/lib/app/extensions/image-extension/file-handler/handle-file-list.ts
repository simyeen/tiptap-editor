import toast from 'react-hot-toast';

import {Editor} from '@tiptap/core';

import {FileValidationOptions} from '../../../../shared/types';
import {filterFiles, randomId} from '../../../../shared/utils';

export default function handleFileList({
  options,
  files,
  handleServerImageUpload,
  editor,
}: {
  options: FileValidationOptions;
  files: (File | {src: string; custom_thumbnail_url: string})[];
  handleServerImageUpload?: (file: File) => Promise<Record<string, string>[]>;
  editor: Editor;
}) {
  const {allowedMimeTypes, maxFileSize, allowBase64} = options;
  const [validFiles, errors] = filterFiles(files, {
    allowedMimeTypes,
    maxFileSize,
    allowBase64,
  });

  if (errors.length > 0) {
    errors.forEach((error) => {
      toast.error(`Image validation error: ${error.reason}`);
    });
  }

  if (validFiles.length > 0 && handleServerImageUpload) {
    validFiles.forEach(async (file) => {
      if (file instanceof File) {
        try {
          const data = await handleServerImageUpload(file);

          if (data.length) {
            const imgFile = data[0];

            editor.commands.addImageWithThumb({
              id: randomId(),
              src: imgFile.file_url,
              custom_thumbnail_url: imgFile.thumbnail_url,
            });
          }
        } catch {
          return false;
        }
      } else {
        editor.commands.addImageWithThumb({
          id: randomId(),
          src: file.src,
          custom_thumbnail_url: file.custom_thumbnail_url,
        });
      }
    });
  }
}

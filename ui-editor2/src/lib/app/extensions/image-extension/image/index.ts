import toast from 'react-hot-toast';

import {randomId} from '../../../../shared/utils';
import {HandleUploadProps} from '../../../types/share';
import {ExtendedImage} from './extend';

export const ConfiguredImage = ({thumbnailUrl, onThumbnailUrlChange}: HandleUploadProps) => {
  return ExtendedImage().configure({
    allowedMimeTypes: ['image/*'],
    maxFileSize: 5 * 1024 * 1024,
    allowBase64: true,

    blogThumbnailUrl: thumbnailUrl,

    onThumbnailUrl: (thumbnail_url) => {
      onThumbnailUrlChange?.(thumbnail_url);
    },

    onToggle(editor, files, pos) {
      editor.commands.insertContentAt(
        pos,
        files.map((image) => {
          const blobUrl = URL.createObjectURL(image);
          const id = randomId();

          return {
            type: 'image',
            attrs: {
              id,
              src: blobUrl,
              alt: image.name,
              title: image.name,
              fileName: image.name,
            },
          };
        })
      );
    },
    onImageRemoved({id, src}) {
      // console.log('Image removed', {id, src});
    },
    onValidationError(errors) {
      errors.forEach((error) => {
        toast.error(`Image validation error : ${error.reason}`);
      });
    },
    onActionSuccess({action}) {
      const mapping = {
        copyImage: 'Copy Image',
        copyLink: 'Copy Link',
        download: 'Download',
      };
      toast.success(`${mapping[action]} Image action success`);
    },
    onActionError(error, {action}) {
      const mapping = {
        copyImage: 'Copy Image',
        copyLink: 'Copy Link',
        download: 'Download',
      };

      toast.error(`Failed to ${mapping[action]}: ${error.message}`);
    },
  });
};

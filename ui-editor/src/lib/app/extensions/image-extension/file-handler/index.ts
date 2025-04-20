import {HandleUploadProps} from '../../../types/share';
import {ExtendedFileHandler} from './extend';

export const ConfiguredFileHandler = (props: HandleUploadProps) => {
  return ExtendedFileHandler(props).configure({
    allowBase64: true,
    allowedMimeTypes: ['image/*'],
    maxFileSize: 5 * 1024 * 1024,
  });
};

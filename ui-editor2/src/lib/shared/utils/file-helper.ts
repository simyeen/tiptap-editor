import {FileError, FileInput, FileValidationOptions} from '../types';
import {sanitizeUrl} from './converter';

const _base64MimeType = (encoded: string): string => {
  const result = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
  return result && result.length > 1 ? result[1] : 'unknown';
};

const isBase64 = (str: string): boolean => {
  if (str.startsWith('data:')) {
    const matches = str.match(/^data:[^;]+;base64,(.+)$/);
    if (matches?.[1]) {
      str = matches[1];
    } else {
      return false;
    }
  }

  try {
    return btoa(atob(str)) === str;
  } catch {
    return false;
  }
};

const _checkTypeAndSize = (
  input: File | string,
  {allowedMimeTypes, maxFileSize}: FileValidationOptions
): {isValidType: boolean; isValidSize: boolean} => {
  const mimeType = input instanceof File ? input.type : _base64MimeType(input);
  const size = input instanceof File ? input.size : atob(input.split(',')[1]).length;

  const isValidType =
    allowedMimeTypes.length === 0 ||
    allowedMimeTypes.includes(mimeType) ||
    allowedMimeTypes.includes(`${mimeType.split('/')[0]}/*`);

  const isValidSize = !maxFileSize || size <= maxFileSize;

  return {isValidType, isValidSize};
};

const validateFileOrBase64 = <T extends FileInput>(
  input: File | string,
  options: FileValidationOptions,
  originalFile: T,
  validFiles: T[],
  errors: FileError[]
): void => {
  const {isValidType, isValidSize} = _checkTypeAndSize(input, options);

  if (isValidType && isValidSize) {
    validFiles.push(originalFile);
  } else {
    if (!isValidType) errors.push({file: input, reason: 'type'});
    if (!isValidSize) errors.push({file: input, reason: 'size'});
  }
};

export const filterFiles = <T extends FileInput>(
  files: T[],
  options: FileValidationOptions
): [T[], FileError[]] => {
  const validFiles: T[] = [];
  const errors: FileError[] = [];

  files.forEach((file) => {
    const actualFile = 'src' in file ? file.src : file;

    if (actualFile instanceof File) {
      validateFileOrBase64(actualFile, options, file, validFiles, errors);
    } else if (typeof actualFile === 'string') {
      if (isBase64(actualFile)) {
        if (options.allowBase64) {
          validateFileOrBase64(actualFile, options, file, validFiles, errors);
        } else {
          errors.push({file: actualFile, reason: 'base64NotAllowed'});
        }
      } else if (sanitizeUrl(actualFile, {allowBase64: options.allowBase64})) {
        validFiles.push(file);
      } else {
        errors.push({file: actualFile, reason: 'invalidBase64'});
      }
    }
  });

  return [validFiles, errors];
};

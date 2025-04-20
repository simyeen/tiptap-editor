export type FileError = {
  file: File | string;
  reason: 'type' | 'size' | 'invalidBase64' | 'base64NotAllowed';
};

export type FileValidationOptions = {
  allowedMimeTypes: string[];
  maxFileSize?: number;
  allowBase64: boolean;
};

export type FileInput = File | {src: string | File; alt?: string; title?: string};

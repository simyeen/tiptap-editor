import {CustomImageOptions, ImageActionProps} from './type';

const _handleError = (
  error: unknown,
  props: ImageActionProps,
  errorHandler?: (error: Error, props: ImageActionProps) => void
): void => {
  const typedError = error instanceof Error ? error : new Error('Unknown error');
  errorHandler?.(typedError, props);
};

const _handleDataUrl = (src: string): {blob: Blob; extension: string} => {
  const [header, base64Data] = src.split(',');
  const mimeType = header.split(':')[1].split(';')[0];
  const extension = mimeType.split('/')[1];
  const byteCharacters = atob(base64Data);
  const byteArray = new Uint8Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArray[i] = byteCharacters.charCodeAt(i);
  }
  const blob = new Blob([byteArray], {type: mimeType});
  return {blob, extension};
};

const _handleImageUrl = async (src: string): Promise<{blob: Blob; extension: string}> => {
  const response = await fetch(src);
  if (!response.ok) throw new Error('Failed to fetch image');
  const blob = await response.blob();
  const extension = blob.type.split(/\/|\+/)[1];
  return {blob, extension};
};

const _fetchImageBlob = async (src: string): Promise<{blob: Blob; extension: string}> => {
  return src.startsWith('data:') ? _handleDataUrl(src) : _handleImageUrl(src);
};

const _saveImage = async (blob: Blob, name: string, extension: string): Promise<void> => {
  const imageURL = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = imageURL;
  link.download = `${name}.${extension}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(imageURL);
};

export const downloadImage = async (
  props: ImageActionProps,
  options: CustomImageOptions
): Promise<void> => {
  const {src, alt} = props;
  const potentialName = alt || 'image';

  try {
    const {blob, extension} = await _fetchImageBlob(src);
    await _saveImage(blob, potentialName, extension);
    options.onActionSuccess?.({...props, action: 'download'});
  } catch (error) {
    _handleError(error, {...props, action: 'download'}, options.onActionError);
  }
};

export const copyImage = async (
  props: ImageActionProps,
  options: CustomImageOptions
): Promise<void> => {
  const {src} = props;
  try {
    const res = await fetch(src);
    const blob = await res.blob();
    const data = new ClipboardItem({[blob.type]: blob});
    await navigator.clipboard.write([data]);
    options.onActionSuccess?.({...props, action: 'copyImage'});
  } catch (error) {
    _handleError(error, {...props, action: 'copyImage'}, options.onActionError);
  }
};

export const copyLink = async (
  props: ImageActionProps,
  options: CustomImageOptions
): Promise<void> => {
  const {src} = props;
  try {
    await navigator.clipboard.writeText(src);
    options.onActionSuccess?.({...props, action: 'copyLink'});
  } catch (error) {
    _handleError(error, {...props, action: 'copyLink'}, options.onActionError);
  }
};

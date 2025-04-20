import {isUrl} from './share';

export const sanitizeUrl = (
  url: string | null | undefined,
  options: {allowBase64?: boolean} = {}
): string | undefined => {
  if (!url) return undefined;

  if (options.allowBase64 && url.startsWith('data:image')) {
    return isUrl(url, {requireHostname: false, allowBase64: true}) ? url : undefined;
  }

  return isUrl(url, {requireHostname: false, allowBase64: options.allowBase64}) ||
    /^(\/|#|mailto:|sms:|fax:|tel:)/.test(url)
    ? url
    : `https://${url}`;
};

export const blobUrlToBase64 = async (blobUrl: string): Promise<string> => {
  const response = await fetch(blobUrl);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert Blob to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const fileToBase64 = (file: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert File to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

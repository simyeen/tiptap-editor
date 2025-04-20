import type {ImageOptions} from '@tiptap/extension-image';
import type {Attrs} from '@tiptap/pm/model';
import type {Editor} from '@tiptap/react';

import {FileError, FileValidationOptions} from '../../../../shared/types';

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    addImageWithThumb: {
      addImageWithThumb: (attrs: AddImageCommandProps) => ReturnType;
    };
    setBlogThumbnailUrl: {
      setBlogThumbnailUrl: (attrs: string) => ReturnType;
    };
    checkBlogThumbnailUrl: {
      checkBlogThumbnailUrl: (attrs: string) => ReturnType;
    };
    downloadImage: {
      downloadImage: (attrs: DownloadImageCommandProps) => ReturnType;
    };
    copyImage: {
      copyImage: (attrs: DownloadImageCommandProps) => ReturnType;
    };
    copyLink: {
      copyLink: (attrs: DownloadImageCommandProps) => ReturnType;
    };
    toggleImage: {
      toggleImage: () => ReturnType;
    };
  }
}

export type ImageAction = 'download' | 'copyImage' | 'copyLink';

export interface AddImageCommandProps {
  id: string;
  src: string;
  custom_thumbnail_url: string;
}

export interface DownloadImageCommandProps {
  src: string;
  alt?: string;
}

export interface ImageActionProps extends DownloadImageCommandProps {
  action: ImageAction;
}

export interface CustomImageOptions
  extends ImageOptions,
    Omit<FileValidationOptions, 'allowBase64'> {
  onImageRemoved?: (props: Attrs) => void;
  onActionSuccess?: (props: ImageActionProps) => void;
  onActionError?: (error: Error, props: ImageActionProps) => void;
  downloadImage?: (props: ImageActionProps, options: CustomImageOptions) => Promise<void>;
  copyImage?: (props: ImageActionProps, options: CustomImageOptions) => Promise<void>;
  copyLink?: (props: ImageActionProps, options: CustomImageOptions) => Promise<void>;
  onValidationError?: (errors: FileError[]) => void;
  onToggle?: (editor: Editor, files: File[], pos: number) => void;

  onGetThumbnailUrl?: () => string | undefined;
  onThumbnailUrl?: (thumbnailUrl: string) => void;

  getCurrentThumbnailUrl?: () => string;

  blogThumbnailUrl?: string;
}

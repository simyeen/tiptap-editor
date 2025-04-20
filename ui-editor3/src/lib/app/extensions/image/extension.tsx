import Image from '@tiptap/extension-image';
import {ImageOptions} from '@tiptap/extension-image';
import {ReactNodeViewRenderer, mergeAttributes} from '@tiptap/react';

import {ContentImage} from '../../../widgets';

export interface CustomImageOptions {
  inline: boolean;
  allowBase64: boolean;
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    image: {
      setImage: (options: {src: string; alt?: string; title?: string}) => ReturnType;
    };
  }
}

export default Image.extend<CustomImageOptions>({
  name: 'image',
  group: 'block',
  inline: false,
  draggable: true,

  addNodeView() {
    return ReactNodeViewRenderer(ContentImage);
  },

  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]',
      },
    ];
  },

  renderHTML({node, HTMLAttributes}) {
    return [
      'img',
      {
        ...HTMLAttributes,
        src: node.attrs.src,
        alt: node.attrs.alt || '',
        title: node.attrs.title || '',
      },
    ];
  },

  addAttributes() {
    return {
      src: {default: null},
      alt: {default: null},
      title: {default: null},
      width: {default: 'auto'}, // ✅ 기본값 추가
      height: {default: 'auto'}, // ✅ 기본값 추가
      align: {default: 'center'}, // 추가된 align 속성
    };
  },
});

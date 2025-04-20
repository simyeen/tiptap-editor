import {Image as TiptapImage} from '@tiptap/extension-image';
import {ReplaceStep} from '@tiptap/pm/transform';
import {ReactNodeViewRenderer} from '@tiptap/react';

import {filterFiles} from '../../../../shared/utils';
import {EditorContentImage} from '../../../../widgets';
import {CustomImageOptions} from './type';
import {copyImage, copyLink, downloadImage} from './utils';

export const ExtendedImage = () => {
  return TiptapImage.extend<CustomImageOptions>({
    atom: true,

    addNodeView() {
      return ReactNodeViewRenderer((props) => <EditorContentImage {...props} />, {
        className: 'block-node',
      });
    },

    addAttributes() {
      return {
        id: {default: null},
        src: {default: null},
        alt: {default: null},
        title: {default: null},
        width: {default: null},
        height: {default: null},
        fileName: {default: null},
        align: {default: null},
        custom_thumbnail_url: {
          default: null,
        },
      };
    },

    addOptions() {
      return {
        ...this.parent?.(),
        blogThumbnailUrl: '',
        allowedMimeTypes: [],
        maxFileSize: 0,
        onImageServerUpload: undefined,
        onToggle: undefined,
        downloadImage: undefined,
        copyImage: undefined,
        copyLink: undefined,
      };
    },

    addCommands() {
      return {
        addImageWithThumb: (attrs) => () => {
          if (!this.options.blogThumbnailUrl) {
            this.options.blogThumbnailUrl = attrs.custom_thumbnail_url;
            this.options.onThumbnailUrl?.(attrs.custom_thumbnail_url);
          }

          this.editor.commands.insertContent({
            type: 'image',
            attrs,
          });

          return true;
        },
        setBlogThumbnailUrl: (newBlogThumbnailUrl: string) => () => {
          this.options.blogThumbnailUrl = newBlogThumbnailUrl;
          return true;
        },
        checkBlogThumbnailUrl: (currentBlogThumbnailUrl: string) => () => {
          return this.options.blogThumbnailUrl === currentBlogThumbnailUrl;
        },
        downloadImage: (attrs) => () => {
          const downloadFunc = this.options.downloadImage || downloadImage;
          void downloadFunc({...attrs, action: 'download'}, this.options);
          return true;
        },

        copyImage: (attrs) => () => {
          const copyImageFunc = this.options.copyImage || copyImage;
          void copyImageFunc({...attrs, action: 'copyImage'}, this.options);
          return true;
        },

        copyLink: (attrs) => () => {
          const copyLinkFunc = this.options.copyLink || copyLink;
          void copyLinkFunc({...attrs, action: 'copyLink'}, this.options);
          return true;
        },

        toggleImage:
          () =>
          ({editor}) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = this.options.allowedMimeTypes.join(',');
            input.onchange = () => {
              const files = input.files;
              if (!files) return;

              const [validImages, errors] = filterFiles(Array.from(files), {
                allowedMimeTypes: this.options.allowedMimeTypes,
                maxFileSize: this.options.maxFileSize,
                allowBase64: this.options.allowBase64,
              });

              if (errors.length > 0 && this.options.onValidationError) {
                this.options.onValidationError(errors);
                return false;
              }

              if (validImages.length === 0) return false;

              if (this.options.onToggle) {
                this.options.onToggle(editor, validImages, editor.state.selection.from);
              }

              return false;
            };

            input.click();
            return true;
          },
      };
    },

    onTransaction({transaction}) {
      transaction.steps.forEach((step) => {
        if (step instanceof ReplaceStep && step.slice.size === 0) {
          const deletedPages = transaction.before.content.cut(step.from, step.to);

          deletedPages.forEach((node) => {
            if (node.type.name !== 'image') {
              return;
            }
            const attrs = node.attrs;

            if (attrs.src.startsWith('blob:')) {
              URL.revokeObjectURL(attrs.src);
            }

            this.options.onImageRemoved?.(attrs);
          });
        }
      });
    },
  });
};

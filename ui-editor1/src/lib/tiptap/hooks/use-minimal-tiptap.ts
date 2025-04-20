import {cn} from '@kt-web-dev-package/ui-core';
import {Gapcursor} from '@tiptap/extension-gapcursor';
import {Highlight} from '@tiptap/extension-highlight';
import {Placeholder} from '@tiptap/extension-placeholder';
import {Subscript} from '@tiptap/extension-subscript';
import {Superscript} from '@tiptap/extension-superscript';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import {TextAlign} from '@tiptap/extension-text-align';
import {TextStyle} from '@tiptap/extension-text-style';
import {Typography} from '@tiptap/extension-typography';
import {Underline} from '@tiptap/extension-underline';
import {Youtube} from '@tiptap/extension-youtube';
import {Editor, mergeAttributes} from '@tiptap/react';
import type {Content, UseEditorOptions} from '@tiptap/react';
import {useEditor} from '@tiptap/react';
import {StarterKit} from '@tiptap/starter-kit';
import * as React from 'react';
import {toast} from 'sonner';

import {
  CodeBlockLowlight,
  Color,
  FileHandler,
  FontSize,
  HorizontalRule,
  Image,
  Link,
  ResetMarksOnEnter,
  Selection,
  TableImproved,
  UnsetAllMarks,
} from '../extensions';
import {fileToBase64, getContent, getEmbedUrlFromYoutubeUrl, getOutput, randomId} from '../util';

export interface UseMinimalTiptapEditorProps extends UseEditorOptions {
  value?: Content;
  output?: 'html' | 'json' | 'text';
  placeholder?: string;
  editorClassName?: string;
  throttleDelay?: number;
  onChange?: ({content, original_content}: {content: string; original_content: string}) => void;
  onBlur?: (content: Content) => void;
  handleUpload?: (file: File) => Promise<Record<string, string>[]>;
  toolbarHeight?: number;
}

const CustomSubscript = Subscript.extend({
  excludes: 'superscript',
});

const CustomSuperscript = Superscript.extend({
  excludes: 'subscript',
});

const CustomYoutube = Youtube.extend({
  addAttributes() {
    return {
      width: {
        default: '100%',
      },
      src: {
        default: null,
      },
      start: {
        default: 0,
      },
      class: {
        default: 'aspect-video',
      },
    };
  },

  renderHTML({HTMLAttributes}) {
    const embedUrl = getEmbedUrlFromYoutubeUrl({
      url: HTMLAttributes.src,
      allowFullscreen: this.options.allowFullscreen,
      autoplay: this.options.autoplay,
      ccLanguage: this.options.ccLanguage,
      ccLoadPolicy: this.options.ccLoadPolicy,
      controls: this.options.controls,
      disableKBcontrols: this.options.disableKBcontrols,
      enableIFrameApi: this.options.enableIFrameApi,
      endTime: this.options.endTime,
      interfaceLanguage: this.options.interfaceLanguage,
      ivLoadPolicy: this.options.ivLoadPolicy,
      loop: this.options.loop,
      modestBranding: this.options.modestBranding,
      nocookie: this.options.nocookie,
      origin: this.options.origin,
      playlist: this.options.playlist,
      progressBarColor: this.options.progressBarColor,
      startAt: HTMLAttributes.start || 0,
    });

    HTMLAttributes.src = embedUrl;

    return this.editor?.isEditable
      ? [
          'div',
          {'data-youtube-video': '', draggable: this.editor?.isEditable},
          [
            'iframe',
            mergeAttributes(
              this.options.HTMLAttributes,
              {
                width: this.options.width,
                height: this.options.height,
                allowfullscreen: this.options.allowFullscreen,
                autoplay: this.options.autoplay,
                ccLanguage: this.options.ccLanguage,
                ccLoadPolicy: this.options.ccLoadPolicy,
                disableKBcontrols: this.options.disableKBcontrols,
                enableIFrameApi: this.options.enableIFrameApi,
                endTime: this.options.endTime,
                interfaceLanguage: this.options.interfaceLanguage,
                ivLoadPolicy: this.options.ivLoadPolicy,
                loop: this.options.loop,
                modestBranding: this.options.modestBranding,
                origin: this.options.origin,
                playlist: this.options.playlist,
                progressBarColor: this.options.progressBarColor,
              },
              HTMLAttributes
            ),
          ],
        ]
      : [
          'iframe',
          mergeAttributes(
            this.options.HTMLAttributes,
            {
              width: this.options.width,
              height: this.options.height,
              allowfullscreen: this.options.allowFullscreen,
              autoplay: this.options.autoplay,
              ccLanguage: this.options.ccLanguage,
              ccLoadPolicy: this.options.ccLoadPolicy,
              disableKBcontrols: this.options.disableKBcontrols,
              enableIFrameApi: this.options.enableIFrameApi,
              endTime: this.options.endTime,
              interfaceLanguage: this.options.interfaceLanguage,
              ivLoadPolicy: this.options.ivLoadPolicy,
              loop: this.options.loop,
              modestBranding: this.options.modestBranding,
              origin: this.options.origin,
              playlist: this.options.playlist,
              progressBarColor: this.options.progressBarColor,
            },
            HTMLAttributes
          ),
        ];
  },
});

const createExtensions = ({
  placeholder,
  handleUpload,
}: {
  placeholder: string;
  handleUpload?: (file: File) => Promise<Record<string, string>[]>;
}) => [
  StarterKit.configure({
    horizontalRule: false,
    codeBlock: false,
    gapcursor: false,
    paragraph: {HTMLAttributes: {class: 'text-node'}},
    heading: {HTMLAttributes: {class: 'heading-node'}},
    blockquote: {HTMLAttributes: {class: 'block-node'}},
    bulletList: {HTMLAttributes: {class: 'list-node'}},
    orderedList: {HTMLAttributes: {class: 'list-node'}},
    code: {HTMLAttributes: {class: 'inline', spellcheck: 'false'}},
    dropcursor: {width: 2, class: 'ProseMirror-dropcursor border'},
  }),
  Link,
  Underline,
  Image.configure({
    allowedMimeTypes: ['image/*'],
    maxFileSize: 5 * 1024 * 1024,
    allowBase64: true,
    uploadFn: async (file) => {
      try {
        const data = await handleUpload?.(file);
        if (data) {
          return {id: randomId(), src: 'src' in data[0] ? data[0].src : ''};
        }
      } catch {
        const src = await fileToBase64(file);
        return {id: randomId(), src};
      }
      const src = await fileToBase64(file);
      return {id: randomId(), src};
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
        toast.error('Image validation error', {
          position: 'bottom-right',
          description: error.reason,
        });
      });
    },
    onActionSuccess({action}) {
      const mapping = {
        copyImage: 'Copy Image',
        copyLink: 'Copy Link',
        download: 'Download',
      };
      toast.success(mapping[action], {
        position: 'bottom-right',
        description: 'Image action success',
      });
    },
    onActionError(error, {action}) {
      const mapping = {
        copyImage: 'Copy Image',
        copyLink: 'Copy Link',
        download: 'Download',
      };
      toast.error(`Failed to ${mapping[action]}`, {
        position: 'bottom-right',
        description: error.message,
      });
    },
  }),
  FileHandler.configure({
    allowBase64: true,
    allowedMimeTypes: ['image/*'],
    maxFileSize: 5 * 1024 * 1024,
    onDrop: (editor: Editor, files, pos) => {
      files.forEach(async (file: File) => {
        try {
          const data = await handleUpload?.(file);
          if (data) {
            editor.commands.insertContent({
              type: 'image',
              attrs: {src: 'src' in data[0] ? data[0].src : ''},
            });
          }
        } catch {
          const src = await fileToBase64(file);
          editor.commands.insertContent({
            type: 'image',
            attrs: {src},
          });
        }
      });
    },
    onPaste: (editor, files, pasteContent) => {
      files.forEach(async (file) => {
        try {
          const data = await handleUpload?.(file);
          if (data) {
            editor.commands.insertContent({
              type: 'image',
              attrs: {src: 'src' in data[0] ? data[0].src : ''},
            });
          }
        } catch {
          const src = await fileToBase64(file);
          editor.commands.insertContent({
            type: 'image',
            attrs: {src},
          });
        }
      });
    },
    onValidationError: (errors) => {
      errors.forEach((error) => {
        toast.error('Image validation error', {
          position: 'bottom-right',
          description: error.reason,
        });
      });
    },
  }),
  Color,
  TextStyle,
  Selection,
  Typography,
  UnsetAllMarks,
  HorizontalRule,
  ResetMarksOnEnter,
  CodeBlockLowlight,
  Placeholder.configure({
    placeholder: () => placeholder,
    emptyNodeClass: 'text-fg-500',
  }),
  CustomSubscript,
  CustomSuperscript,
  Highlight.configure({multicolor: true}),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  CustomYoutube.configure({
    controls: false,
    nocookie: false,
  }),
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  TableImproved.configure({
    resizable: true,
  }),
  TableCell,
  TableHeader,
  TableRow,

  // Add your custom extensions here
  FontSize,
  Gapcursor,
];

export default function useMinimalTiptapEditor({
  value,
  output = 'html',
  placeholder = '',
  editorClassName,
  throttleDelay = 0,
  onChange,
  onBlur,
  handleUpload,
  toolbarHeight,
  ...props
}: UseMinimalTiptapEditorProps) {
  const handleUpdate = React.useCallback(
    (editor: Editor) => {
      if (editor.isEmpty) {
        editor.chain().focus().unsetFontSize().run();
      }
    },
    [output]
  );

  const handleCreate = React.useCallback(
    (editor: Editor) => {
      if (value && editor.isEmpty) {
        editor.commands.setContent(value);
      }
    },
    [value]
  );

  const handleBlur = React.useCallback(
    (editor: Editor) => {
      onChange?.(getContent(editor));
      onBlur?.(getOutput(editor, output));
    },
    [output, onBlur]
  );

  const editor = useEditor({
    extensions: createExtensions({placeholder, handleUpload}),
    editorProps: {
      scrollMargin: 192 + (toolbarHeight ? toolbarHeight : 0),
      scrollThreshold: 192 + (toolbarHeight ? toolbarHeight : 0),
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        class: cn('space-y-2.5', editorClassName),
      },
    },
    onUpdate: ({editor}) => handleUpdate(editor),
    onCreate: ({editor}) => handleCreate(editor),
    onBlur: ({editor}) => handleBlur(editor),
    // onTransaction: ({editor, transaction}) => {
    //   // eslint-disable-next-line no-console
    //   console.debug('transaction!!!');
    //   // eslint-disable-next-line no-console
    //   console.debug('editor', getContent(editor));
    //   // eslint-disable-next-line no-console
    //   console.debug('transaction', transaction);
    // },
    ...props,
  });

  return editor;
}

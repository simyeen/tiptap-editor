import {Editor} from '@tiptap/core';
import type {Content, UseEditorOptions} from '@tiptap/react';

export type HandleEditorChange = ({
  content,
  original_content,
}: {
  content: string;
  original_content: string;
}) => void;

export type HandleEditorBlur = ({
  content,
  original_content,
}: {
  content: string;
  original_content: string;
}) => void;

export interface EditorProps {
  editor: Editor;
  isError?: boolean;
  handleServerImageUpload?: (file: File) => Promise<Record<string, string>[]>;
}

export interface UseArticleEditorProps extends UseEditorOptions {
  output?: 'html' | 'json' | 'text';
  placeholder?: string;
  editorClassName?: string;
  throttleDelay?: number;
  handleEditorChange?: HandleEditorChange;
  handleServerImageUpload?: (file: File) => Promise<Record<string, string>[]>;
  onBlur?: (content: Content) => void;
  toolbarHeight?: number;
}

export interface ArticleEditorProps extends Omit<UseArticleEditorProps, 'onUpdate'> {
  value?: Content;
  isError?: boolean;

  handleEditorChange?: HandleEditorChange;
  handleEditorBlur?: HandleEditorBlur;

  getThumbnailUrl?: () => string;
  handleThumbnailUrl?: (thumbnailUrl: string) => void;
  handleServerImageUpload?: (file: File) => Promise<Record<string, string>[]>;
  setTags?: (tags: string[]) => void;

  currentThumbnailUrl?: string;
}

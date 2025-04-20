import * as React from 'react';

import type {EditorState} from '@tiptap/pm/state';
import type {EditorView} from '@tiptap/pm/view';
import type {Editor} from '@tiptap/react';

export interface ShouldShowProps {
  editor: Editor;
  view: EditorView;
  state: EditorState;
  oldState?: EditorState;
  from: number;
  to: number;
}

/**
 * @description
 * action : return type of tiptap action is boolean, so return boolean.
 */
export interface FormatAction {
  label: string;
  icon?: React.ReactNode;
  action: () => boolean;
  isActive: boolean;
  canExecute: boolean;
  shortcuts: string[];
  value: string;
}

export interface TableToolbarButtonProps {
  tooltip: string;
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  hasDivider?: boolean;
  isActive?: boolean;
}

export type UploadReturnType =
  | string
  | {
      id: string | number;
      src: string;
    };

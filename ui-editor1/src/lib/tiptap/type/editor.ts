import type {EditorState} from '@tiptap/pm/state';
import type {EditorView} from '@tiptap/pm/view';
import type {Editor} from '@tiptap/react';

export interface LinkProps {
  url: string;
  text?: string;
  openInNewTab?: boolean;
}

export interface ShouldShowProps {
  editor: Editor;
  view: EditorView;
  state: EditorState;
  oldState?: EditorState;
  from: number;
  to: number;
}

export interface FormatAction {
  label: string;
  icon?: React.ReactNode;
  action: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
  canExecute: (editor: Editor) => boolean;
  shortcuts: string[];
  value: string;
}

export type RGB = {r: number; g: number; b: number};
export type HSL = {h: number; s: number; l: number};
export type ColorPickerState =
  | {mode: 'NAMED'; color: string}
  | {
      mode: 'HEX';
      hex: string;
    }
  | {
      mode: 'RGB';
      rgb: RGB;
    }
  | {
      mode: 'HSL';
      hsl: HSL;
    };

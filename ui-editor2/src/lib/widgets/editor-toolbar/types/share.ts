import type {Level} from '@tiptap/extension-heading';

import {FormatAction} from '../../../shared/types';

export interface TextStyle extends Omit<FormatAction, 'value' | 'canExecute'> {
  element: keyof JSX.IntrinsicElements;
  level?: Level;
  className: string;
}

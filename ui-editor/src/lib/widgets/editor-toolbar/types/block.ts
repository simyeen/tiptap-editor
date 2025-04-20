import {FormatAction} from '../../../shared/types';

export type InsertElementAction = 'codeBlock' | 'blockquote' | 'horizontalRule' | 'table';

export interface InsertElement extends FormatAction {
  value: 'codeBlock' | 'blockquote' | 'horizontalRule' | 'table';
}

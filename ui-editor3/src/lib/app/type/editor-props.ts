import {HTMLAttributes} from 'react';

export interface EditorProps {
  placeholder?: string;
  content?: string;
  editable?: boolean;
  footer?: React.ReactNode;
  editorWrapperStyle?: string;
  editorContainerProps?: HTMLAttributes<HTMLDivElement>;
  onChange?: () => void;
}

import {EditorProps} from '../../shared/types';
import Components from './components';

export default function EditorToolbar({editor, isError, handleServerImageUpload}: EditorProps) {
  return (
    <Components
      editor={editor}
      isError={isError}
      handleServerImageUpload={handleServerImageUpload}
    />
  );
}

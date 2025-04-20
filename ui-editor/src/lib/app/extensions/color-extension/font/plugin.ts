import {Editor} from '@tiptap/core';
import {Plugin} from '@tiptap/pm/state';

export const fontColorPlugin = (editor: Editor) => {
  return new Plugin({
    props: {
      handleKeyDown: (_, event) => {
        if (event.key === 'Enter') {
          editor.commands.unsetColor();
        }
        return false;
      },
    },
  });
};

export default fontColorPlugin;

import {NodeViewProps} from '@tiptap/react';

import Components from './components';

// interface EditorContentImageProps extends NodeViewProps {
//   getThumbnailUrl?: () => string;
//   handleThumbnailUrl?: (url: string) => void;
// }

export default function EditorContentImage({
  node,
  editor,
  selected,
  updateAttributes,
  ...props
}: NodeViewProps) {
  return (
    <Components
      {...{
        node,
        editor,
        selected,
        updateAttributes,

        ...props,
      }}
    />
  );
}

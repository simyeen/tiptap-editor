import {CheckIcon} from 'lucide-react';
import {useEffect, useState} from 'react';

import {Editor} from '@tiptap/core';

interface ImageThumbnailButtonProps {
  editor: Editor;
  contentImageState: {custom_thumbnail_url: string; src: string};
  onThumbnailUrl?: (url: string) => void;
  getCurrentThumbnailUrl?: () => string;
}

const ImageThumbnailButton = ({
  editor,
  contentImageState,
  onThumbnailUrl,
}: ImageThumbnailButtonProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    document.querySelectorAll('.thumbnail-button').forEach((btn) => {
      btn.setAttribute('data-selected', 'false');
    });

    event.currentTarget.setAttribute('data-selected', 'true');

    const selectedThumbnailUrl = contentImageState.custom_thumbnail_url
      ? contentImageState.custom_thumbnail_url
      : contentImageState.src.startsWith('http')
        ? contentImageState.src
        : 'ERROR_NO_THUMBNAIL_URL'; // 또는 다른 기본값

    onThumbnailUrl?.(selectedThumbnailUrl);
  };

  useEffect(() => {
    setIsSelected(editor.commands.checkBlogThumbnailUrl(contentImageState.custom_thumbnail_url));
  }, [contentImageState.custom_thumbnail_url, editor.commands.checkBlogThumbnailUrl]);

  return (
    <button
      className="thumbnail-button absolute right-2 top-2 hidden h-10 w-[72px] rounded-full border border-fg-500 p-0 text-sz-lg-regular text-white transition-colors hover:bg-black group-hover:block"
      onClick={onClick}
      data-selected={isSelected}
    >
      <div className="flex items-center justify-center gap-1">
        <CheckIcon className="check-icon size-5" />
        <span>대표</span>
      </div>
    </button>
  );
};

export {ImageThumbnailButton};

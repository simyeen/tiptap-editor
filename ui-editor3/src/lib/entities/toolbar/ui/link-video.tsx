import {Video} from 'lucide-react';
import React, {useEffect} from 'react';

import {useCurrentEditor} from '@tiptap/react';

import {ICON_SIZE, ICON_STROKE_WIDTH} from '../../../shared/constant';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  Input,
} from '../../../shared/ui';

export default function LinkURL() {
  const {editor} = useCurrentEditor();
  const formRef = React.useRef<HTMLDivElement>(null);
  const [url, setUrl] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleConfirm = () => {
    const urlInput = formRef.current?.querySelector<HTMLInputElement>('input[type="url"]');
    if (urlInput && !urlInput.checkValidity()) {
      urlInput.reportValidity();
      return;
    }

    onSetVideo(url);
    setUrl('');
    setOpen(false);
  };

  const onSetVideo = (url: string) => {
    if (editor) {
      const editorDom = editor.view.dom;
      const clientWidth = editorDom.clientWidth * 0.95;
      const aspectRatio = 16 / 9;
      editor
        .chain()
        .focus()
        .setYoutubeVideo({
          src: url,
          width: clientWidth,
          height: clientWidth / aspectRatio,
        })
        .run();
      editor.commands.enter();
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex w-8 cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-fg-100 hover:text-gray-500">
          <Video size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-100 cursor-pointer">
        <DropdownMenuGroup>
          <div ref={formRef} className="space-y-4 px-5 py-3">
            <div className="flex items-center space-x-2">
              <Input
                type="url"
                required
                placeholder="URL을 입력하세요"
                value={url}
                className="w-[300px]"
                onChange={(e) => setUrl(e.target.value)}
              />
              <div className="flex items-center justify-center space-x-2">
                <button
                  className="rounded-md border px-2 py-1 transition-colors hover:bg-black hover:text-white"
                  onClick={handleConfirm}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

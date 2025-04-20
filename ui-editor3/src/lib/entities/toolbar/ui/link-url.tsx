import {Link2} from 'lucide-react';
import React from 'react';

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
  const [text, setText] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const initLink = () => {
    setUrl('');
    setText('');
  };

  const handleConfirm = () => {
    const urlInput = formRef.current?.querySelector<HTMLInputElement>('input[type="url"]');
    if (urlInput && !urlInput.checkValidity()) {
      urlInput.reportValidity();
      return;
    }

    onSetLink(url, text);
    initLink();
    setOpen(false);
  };

  const onSetLink = (url: string, text?: string) => {
    if (editor) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'text',
          text: text || url,
          marks: [
            {
              type: 'link',
              attrs: {
                href: url,
              },
            },
          ],
        })
        .run();
      editor.commands.enter();
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex w-8 cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-fg-100 hover:text-gray-500">
          <Link2 size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-100 cursor-pointer">
        <DropdownMenuGroup>
          <div ref={formRef} className="linkURL space-y-4 px-5 py-3">
            <div className="space-y-1">
              <Input
                type="url"
                required
                placeholder="URL을 입력하세요"
                value={url}
                className="w-[300px]"
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Input
                type="text"
                placeholder="표시 텍스트를 입력하세요 (선택)"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center space-x-2">
              <button
                className="rounded-md border px-2 py-1 transition-colors hover:bg-black hover:text-white"
                onClick={handleConfirm}
              >
                확인
              </button>
            </div>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

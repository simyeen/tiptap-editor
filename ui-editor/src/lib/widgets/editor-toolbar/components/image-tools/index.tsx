import type {VariantProps} from 'class-variance-authority';
import {ImageIcon} from 'lucide-react';
import {useState} from 'react';

import {type Editor, useEditorState} from '@tiptap/react';

import {
  DialogContent as Content,
  DialogDescription as Description,
  Dialog,
  DialogHeader as Header,
  DialogTitle as Title,
  DialogTrigger as Trigger,
  toggleVariants,
} from '../../../../shared/shadcn';
import {AppToolbarButton} from '../../../../shared/ui/app-toolbar-button';
import ToolBlock from './tool-block';

interface ImageEditDialogProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
  handleServerImageUpload?: (file: File) => Promise<Record<string, string>[]>;
}

export default function ImageTools({editor, handleServerImageUpload}: ImageEditDialogProps) {
  const [open, setOpen] = useState(false);
  const {isImageActive} = useEditorState({
    editor,
    selector: ({editor}: {editor: Editor}) => ({
      isImageActive: editor.isActive('image'),
    }),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Trigger asChild>
        <AppToolbarButton isActive={isImageActive} tooltip="그림" aria-label="Image">
          <ImageIcon className="size-5" />
        </AppToolbarButton>
      </Trigger>

      <Content className="sm:max-w-lg">
        <Header>
          <Title>이미지 입력</Title>

          <Description className="sr-only">이미지 파일 업로드</Description>
        </Header>
        <ToolBlock
          editor={editor}
          close={() => setOpen(false)}
          handleServerImageUpload={handleServerImageUpload}
        />
      </Content>
    </Dialog>
  );
}

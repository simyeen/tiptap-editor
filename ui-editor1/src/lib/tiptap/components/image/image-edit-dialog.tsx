import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  toggleVariants,
} from '@kt-web-dev-package/ui-core';
import type {Editor} from '@tiptap/react';
import type {VariantProps} from 'class-variance-authority';
import {ImageIcon} from 'lucide-react';
import {useState} from 'react';

import {ToolbarButton} from '../toolbar-button';
import {ImageEditBlock} from './image-edit-block';

interface ImageEditDialogProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
}

const ImageEditDialog = ({editor, size, variant}: ImageEditDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ToolbarButton
          isActive={editor.isActive('image')}
          tooltip="그림"
          aria-label="Image"
          size={size}
          variant={variant}
        >
          <ImageIcon className="size-5" />
        </ToolbarButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>이미지 입력</DialogTitle>
          <DialogDescription className="sr-only">이미지 파일 업로드</DialogDescription>
        </DialogHeader>
        <ImageEditBlock editor={editor} close={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export {ImageEditDialog};

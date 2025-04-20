import {useEffect, useState} from 'react';

import {NodeViewWrapper, useCurrentEditor} from '@tiptap/react';

import {useContentStore} from '../../../entities/content/store';
import {useImageResize} from '../hook';
import {AlignType, JustifyType, NodeAttributes} from '../type';
import {alignToJustify} from '../util';
import AlignButton from './align-button';
import ImageResizer from './image-resizer';
import SelectButton from './select-button';

interface ComponentProps {
  node: {attrs: NodeAttributes};
}

export default function Component({node}: ComponentProps) {
  const {editor} = useCurrentEditor();
  const editable = editor?.isEditable;

  const {src, alt, width, height, align} = node.attrs;

  const [justify, setJustify] = useState<JustifyType>(alignToJustify(align));

  const initWidth = isNaN(width) || width <= 0 ? 300 : width;
  const initHeight = isNaN(height) || height <= 0 ? 200 : height;
  const {resizedWidth, resizedHeight, handleMouseDown} = useImageResize({initWidth, initHeight});

  const {selectedImage, setSelectedImage} = useContentStore();
  const isSelected = selectedImage === src;

  const handleAlign = (align: AlignType) => {
    editor?.chain().focus().updateAttributes('image', {align}).run();
    setJustify(alignToJustify(align));
  };

  useEffect(() => {
    if (resizedWidth && resizedHeight && editor) {
      setTimeout(() => {
        const _imageAttr = {width: resizedWidth, height: resizedHeight};
        editor.chain().focus().updateAttributes('image', _imageAttr).run();
      }, 0);
    }
  }, [resizedWidth, resizedHeight, editor]);

  return (
    <NodeViewWrapper data-drag-handle draggable className={`flex w-full justify-${justify}`}>
      <div className="group relative">
        {editable && (
          <div className="hidden group-hover:block">
            <AlignButton handleAlign={handleAlign} />
            <ImageResizer handleMouseDown={handleMouseDown} />
          </div>
        )}
        {editable && (
          <div className={isSelected ? '' : 'hidden group-hover:block'}>
            <SelectButton
              imageUrl={src}
              isSelected={isSelected}
              setSelectedImage={setSelectedImage}
            />
          </div>
        )}

        <img
          src={src}
          alt={alt}
          width={resizedWidth}
          height={resizedHeight}
          className="object-contain"
        />
      </div>
    </NodeViewWrapper>
  );
}

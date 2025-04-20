import {cn} from '@shared/ui-theme';

import {Separator} from '../../../shared/shadcn';
import {EditorProps} from '../../../shared/types';
import AlignTools from './align-tools';
import BlockTools from './block-tools';
import {ColorBackgroundTools, ColorFontTools} from './color-tools';
import HeadingTools from './heading-tools';
import ImageTools from './image-tools';
import LiTools from './li-tools';
import TableTools from './table-tools';
import TextTools from './text-tools';
import UrlTools from './url-tools';
import VideoTools from './video-tools';

export default function Components({editor, isError, handleServerImageUpload}: EditorProps) {
  const renderSeparator = () => {
    return <Separator orientation="vertical" className="mx-2 h-7" />;
  };

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-px rounded-t-[6px] bg-background px-5 py-2.5',
        isError
          ? 'border-x border-b border-t border-fg-point border-b-border'
          : 'border border-border'
      )}
    >
      <HeadingTools editor={editor} />
      <TextTools editor={editor} />

      {renderSeparator()}

      <LiTools editor={editor} />

      <AlignTools editor={editor} />

      {renderSeparator()}

      <ColorFontTools editor={editor} />
      <ColorBackgroundTools editor={editor} />
      {renderSeparator()}

      <UrlTools editor={editor} />

      <ImageTools editor={editor} handleServerImageUpload={handleServerImageUpload} />

      <VideoTools editor={editor} />

      {renderSeparator()}

      <BlockTools editor={editor} />

      <TableTools editor={editor} activeActions={['table']} mainActionCount={1} />
    </div>
  );
}

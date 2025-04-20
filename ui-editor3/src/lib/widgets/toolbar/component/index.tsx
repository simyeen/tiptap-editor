import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  BlockCode,
  BlockQuote,
  Image,
  LinkURL,
  LinkVideo,
  ListBullet,
  ListOrdered,
  Redo,
  Table,
  TextBackgroundColorPicker,
  TextBold,
  TextColorPicker,
  TextItalic,
  TextSize,
  TextStrike,
  TextUnderline,
  Undo,
} from '../../../entities/toolbar/ui';
import Separator from './separator';

export default function Component() {
  return (
    <div
      id="toolbar"
      className="flex flex-wrap gap-x-0.5 overflow-x-auto border-b border-gray-200 px-5 py-2"
    >
      <TextSize />
      <TextBold />
      <TextItalic />
      <TextUnderline />
      <TextStrike />

      <Separator />

      <AlignLeft />
      <AlignCenter />
      <AlignRight />
      <AlignJustify />

      <Separator />

      <ListOrdered />
      <ListBullet />

      <Separator />

      <TextColorPicker />
      <TextBackgroundColorPicker />

      <Separator />

      <LinkURL />
      <Image />
      <LinkVideo />

      <Separator />

      <BlockCode />
      <BlockQuote />
      <Table />

      <Separator />

      <Undo />
      <Redo />
    </div>
  );
}

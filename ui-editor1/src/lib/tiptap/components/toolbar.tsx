import {Separator} from '@kt-web-dev-package/ui-core';
import {Editor} from '@tiptap/core';

import {
  SectionExtra,
  SectionFontSize,
  SectionHeading,
  SectionHighlight,
  SectionHistory,
  SectionList,
  SectionTextAlign,
  SectionTextColor,
  SectionTextStyle,
} from '../components/section';

export function Toolbar({editor}: {editor: Editor}) {
  return (
    <div className="flex flex-wrap items-center gap-px rounded-t-[6px] border border-border bg-background px-5 py-2.5">
      <SectionHeading editor={editor} />
      <SectionFontSize editor={editor} />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionTextStyle editor={editor} />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionTextAlign editor={editor} />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionTextColor editor={editor} />
      <SectionHighlight editor={editor} />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionList
        editor={editor}
        activeActions={['orderedList', 'bulletList', 'taskList']}
        mainActionCount={3}
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionExtra
        editor={editor}
        activeActions={['codeBlock', 'blockquote', 'horizontalRule', 'table']}
        mainActionCount={4}
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionHistory editor={editor} />
    </div>
  );
}

import {Color} from '@tiptap/extension-color';
import Document from '@tiptap/extension-document';
import Gapcursor from '@tiptap/extension-gapcursor';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import {StarterKit} from '@tiptap/starter-kit';

import {Image} from './image';

interface ExtensionsProps {
  placeholder: string;
}
export default function Extensions({placeholder}: ExtensionsProps) {
  return [
    Text,
    Image,
    Document,
    Paragraph,
    ListItem,
    Underline,
    Gapcursor,

    TableRow,
    TableCell,
    TableHeader,
    Table.configure({
      resizable: true,
    }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: true,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: true,
      },
    }),
    Link.configure({
      openOnClick: true,
      autolink: true,
      defaultProtocol: 'https',
      protocols: ['http', 'https'],
    }),
    Youtube.configure({controls: false}),
    Highlight.configure({multicolor: true}),
    Placeholder.configure({placeholder: placeholder}),
    TextAlign.configure({types: ['heading', 'paragraph']}),
    Color.configure({types: [TextStyle.name, ListItem.name]}),
    TextStyle.configure({HTMLAttributes: undefined, mergeNestedSpanStyles: false}),
  ];
}

/* 위에 없는 extension은 startkit에 default로 존재. 참고:https://tiptap.dev/docs/editor/extensions/functionality/starterkit */

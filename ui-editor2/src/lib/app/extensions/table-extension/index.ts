import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';

import {ExtendedTable} from './extend';

const ConfiguredTable = () =>
  ExtendedTable.configure({
    resizable: true,
  });

export {ConfiguredTable, TableCell, TableHeader, TableRow};

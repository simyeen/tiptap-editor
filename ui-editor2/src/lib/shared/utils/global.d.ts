import {ClassValue} from 'clsx';
import {domToReact} from 'html-react-parser';

declare global {
  /** @warning before use cn as global variable, you must call 'extendCn' first */
  function cn(...inputs: ClassValue[]): string;

  /** @warning before use parse as global variable, you must call 'initParse' first */
  function parse(html: string): ReturnType<typeof domToReact>;
}

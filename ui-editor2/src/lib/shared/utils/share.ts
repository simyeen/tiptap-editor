import {type Editor} from '@tiptap/react';

import {ArticleEditorProps} from '../types';

type ShortcutKeyResult = {
  symbol: string;
  readable: string;
};

const _isClient = (): boolean => typeof window !== 'undefined';
const _isMacOS = (): boolean => _isClient() && window.navigator.platform === 'MacIntel';

const _shortcutKeyMap: Record<string, ShortcutKeyResult> = {
  mod: _isMacOS() ? {symbol: '⌘', readable: 'Command'} : {symbol: 'Ctrl', readable: 'Control'},
  alt: _isMacOS() ? {symbol: '⌥', readable: 'Option'} : {symbol: 'Alt', readable: 'Alt'},
  shift: {symbol: '⇧', readable: 'Shift'},
};

export const getShortcutKey = (key: string): ShortcutKeyResult =>
  _shortcutKeyMap[key.toLowerCase()] || {symbol: key, readable: key};

export const getOutput = (
  editor: Editor,
  format: ArticleEditorProps['output']
): object | string => {
  switch (format) {
    case 'json':
      return editor.getJSON();
    case 'html':
      return editor.getText() ? editor.getHTML() : '';
    default:
      return editor.getText();
  }
};

export const isUrl = (
  text: string,
  options: {requireHostname: boolean; allowBase64?: boolean} = {requireHostname: false}
): boolean => {
  if (text.includes('\n')) return false;

  try {
    const url = new URL(text);
    const blockedProtocols = [
      'javascript:',
      'file:',
      'vbscript:',
      ...(options.allowBase64 ? [] : ['data:']),
    ];

    if (blockedProtocols.includes(url.protocol)) return false;
    if (options.allowBase64 && url.protocol === 'data:')
      return /^data:image\/[a-z]+;base64,/.test(text);
    if (url.hostname) return true;

    return (
      url.protocol !== '' &&
      (url.pathname.startsWith('//') || url.pathname.startsWith('http')) &&
      !options.requireHostname
    );
  } catch {
    return false;
  }
};

export const randomId = (): string => Math.random().toString(36).slice(2, 11);

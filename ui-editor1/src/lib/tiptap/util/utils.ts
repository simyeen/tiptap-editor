import {getMarkType, getNodeType, getSchemaTypeNameByName} from '@tiptap/core';
import type {Mark, MarkType, Node, NodeType} from '@tiptap/pm/model';
import type {EditorState} from '@tiptap/pm/state';
import {type Editor, useEditorState} from '@tiptap/react';

import type {MinimalTiptapProps} from '../editor/edtior-default';
import {ColorPickerState, HSL, RGB} from '../type';

type ShortcutKeyResult = {
  symbol: string;
  readable: string;
};

export type FileError = {
  file: File | string;
  reason: 'type' | 'size' | 'invalidBase64' | 'base64NotAllowed';
};

export type FileValidationOptions = {
  allowedMimeTypes: string[];
  maxFileSize?: number;
  allowBase64: boolean;
};

type FileInput = File | {src: string | File; alt?: string; title?: string};

export const isClient = (): boolean => typeof window !== 'undefined';
export const isServer = (): boolean => !isClient();
export const isMacOS = (): boolean => isClient() && window.navigator.platform === 'MacIntel';

const shortcutKeyMap: Record<string, ShortcutKeyResult> = {
  mod: isMacOS() ? {symbol: '⌘', readable: 'Command'} : {symbol: 'Ctrl', readable: 'Control'},
  alt: isMacOS() ? {symbol: '⌥', readable: 'Option'} : {symbol: 'Alt', readable: 'Alt'},
  shift: {symbol: '⇧', readable: 'Shift'},
};

export const getShortcutKey = (key: string): ShortcutKeyResult =>
  shortcutKeyMap[key.toLowerCase()] || {symbol: key, readable: key};

export const getShortcutKeys = (keys: string[]): ShortcutKeyResult[] => keys.map(getShortcutKey);

export const getOutput = (
  editor: Editor,
  format: MinimalTiptapProps['output']
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

export const getContent = (editor: Editor) => {
  return editor.getText()
    ? {content: editor.getHTML(), original_content: editor.getText()}
    : {content: '', original_content: ''};
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

export const sanitizeUrl = (
  url: string | null | undefined,
  options: {allowBase64?: boolean} = {}
): string | undefined => {
  if (!url) return undefined;

  if (options.allowBase64 && url.startsWith('data:image')) {
    return isUrl(url, {requireHostname: false, allowBase64: true}) ? url : undefined;
  }

  return isUrl(url, {requireHostname: false, allowBase64: options.allowBase64}) ||
    /^(\/|#|mailto:|sms:|fax:|tel:)/.test(url)
    ? url
    : `https://${url}`;
};

export const blobUrlToBase64 = async (blobUrl: string): Promise<string> => {
  const response = await fetch(blobUrl);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert Blob to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const randomId = (): string => Math.random().toString(36).slice(2, 11);

export const fileToBase64 = (file: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert File to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const validateFileOrBase64 = <T extends FileInput>(
  input: File | string,
  options: FileValidationOptions,
  originalFile: T,
  validFiles: T[],
  errors: FileError[]
): void => {
  const {isValidType, isValidSize} = checkTypeAndSize(input, options);

  if (isValidType && isValidSize) {
    validFiles.push(originalFile);
  } else {
    if (!isValidType) errors.push({file: input, reason: 'type'});
    if (!isValidSize) errors.push({file: input, reason: 'size'});
  }
};

const checkTypeAndSize = (
  input: File | string,
  {allowedMimeTypes, maxFileSize}: FileValidationOptions
): {isValidType: boolean; isValidSize: boolean} => {
  const mimeType = input instanceof File ? input.type : base64MimeType(input);
  const size = input instanceof File ? input.size : atob(input.split(',')[1]).length;

  const isValidType =
    allowedMimeTypes.length === 0 ||
    allowedMimeTypes.includes(mimeType) ||
    allowedMimeTypes.includes(`${mimeType.split('/')[0]}/*`);

  const isValidSize = !maxFileSize || size <= maxFileSize;

  return {isValidType, isValidSize};
};

const base64MimeType = (encoded: string): string => {
  const result = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
  return result && result.length > 1 ? result[1] : 'unknown';
};

const isBase64 = (str: string): boolean => {
  if (str.startsWith('data:')) {
    const matches = str.match(/^data:[^;]+;base64,(.+)$/);
    if (matches && matches[1]) {
      str = matches[1];
    } else {
      return false;
    }
  }

  try {
    return btoa(atob(str)) === str;
  } catch {
    return false;
  }
};

export const filterFiles = <T extends FileInput>(
  files: T[],
  options: FileValidationOptions
): [T[], FileError[]] => {
  const validFiles: T[] = [];
  const errors: FileError[] = [];

  files.forEach((file) => {
    const actualFile = 'src' in file ? file.src : file;

    if (actualFile instanceof File) {
      validateFileOrBase64(actualFile, options, file, validFiles, errors);
    } else if (typeof actualFile === 'string') {
      if (isBase64(actualFile)) {
        if (options.allowBase64) {
          validateFileOrBase64(actualFile, options, file, validFiles, errors);
        } else {
          errors.push({file: actualFile, reason: 'base64NotAllowed'});
        }
      } else {
        if (!sanitizeUrl(actualFile, {allowBase64: options.allowBase64})) {
          errors.push({file: actualFile, reason: 'invalidBase64'});
        } else {
          validFiles.push(file);
        }
      }
    }
  });

  return [validFiles, errors];
};

/**
 * Get the attributes of all currently selected marks of the given type or
 * name.
 *
 * Returns an array of Records, with an entry for each matching mark that is
 * currently selected.
 *
 * Based directly on Tiptap's getMarkAttributes
 * (https://github.com/ueberdosis/tiptap/blob/f387ad3dd4c2b30eaea33fb0ba0b42e0cd39263b/packages/core/src/helpers/getMarkAttributes.ts),
 * but returns results for each of the matching marks, rather than just the
 * first. See related: https://github.com/ueberdosis/tiptap/issues/3481
 */
export function getAttributesForMarks(
  state: EditorState,
  typeOrName: string | MarkType
): Record<string, any>[] {
  const type = getMarkType(typeOrName, state.schema);
  const {from, to, empty} = state.selection;
  const marks: Mark[] = [];

  if (empty) {
    if (state.storedMarks) {
      marks.push(...state.storedMarks);
    }

    marks.push(...state.selection.$head.marks());
  } else {
    state.doc.nodesBetween(from, to, (node) => {
      marks.push(...node.marks);
    });
  }

  return marks
    .filter((markItem) => markItem.type.name === type.name)
    .map((mark) => ({...mark.attrs}));
}

/**
 * Get the attributes of all currently selected nodes of the given type or
 * name.
 *
 * Returns an array of Records, with an entry for each matching node that is
 * currently selected.
 *
 * Based directly on Tiptap's getNodeAttributes
 * (https://github.com/ueberdosis/tiptap/blob/f387ad3dd4c2b30eaea33fb0ba0b42e0cd39263b/packages/core/src/helpers/getNodeAttributes.ts),
 * but returns results for each of the matching nodes, rather than just the
 * first. See related: https://github.com/ueberdosis/tiptap/issues/3481
 */
export function getAttributesForNodes(
  state: EditorState,
  typeOrName: string | NodeType
): Record<string, any>[] {
  const type = getNodeType(typeOrName, state.schema);
  const {from, to} = state.selection;
  const nodes: Node[] = [];

  state.doc.nodesBetween(from, to, (node) => {
    nodes.push(node);
  });

  return nodes
    .reverse()
    .filter((nodeItem) => nodeItem.type.name === type.name)
    .map((node) => ({...node.attrs}));
}

/**
 * Get the attributes of all currently selected marks and nodes of the given
 * type or name.
 *
 * Returns an array of Records, with an entry for each matching mark/node that
 * is currently selected.
 *
 * NOTE: This function will omit any non-matching nodes/marks in the result
 * array. It may be useful to run `editor.isActive(typeOrName)` separately if
 * you want to guarantee that all selected content is of the given type/name.
 *
 * Based directly on Tiptap's getAttributes
 * (https://github.com/ueberdosis/tiptap/blob/f387ad3dd4c2b30eaea33fb0ba0b42e0cd39263b/packages/core/src/helpers/getAttributes.ts),
 * but returns results for each of the matching marks and nodes, rather than
 * just the first. This enables us to handle situations where there are multiple
 * different attributes set for the different marks/nodes. See related issue
 * here: https://github.com/ueberdosis/tiptap/issues/3481
 */
export function getAttributesForEachSelected(
  state: EditorState,
  typeOrName: string | NodeType | MarkType
): Record<string, any>[] {
  const schemaType = getSchemaTypeNameByName(
    typeof typeOrName === 'string' ? typeOrName : typeOrName.name,
    state.schema
  );

  if (schemaType === 'node') {
    return getAttributesForNodes(state, typeOrName as NodeType);
  }

  if (schemaType === 'mark') {
    return getAttributesForMarks(state, typeOrName as MarkType);
  }

  return [];
}

export function getFontSizeText(editor: Editor) {
  const editorState = useEditorState({
    editor,
    selector: ({editor}: {editor: Editor}) => ({
      textStyle: editor.getAttributes('textStyle'),
    }),
  });
  let currentFontSize: string;
  if (editor.state.selection.empty) {
    currentFontSize = editorState.textStyle.fontSize?.slice(0, -2) || '기본값';
  } else {
    const allCurrentTextStyleAttrs = editor
      ? getAttributesForEachSelected(editor.state, 'textStyle')
      : [];
    const currentFontSizes: number[] = allCurrentTextStyleAttrs.map((attrs) =>
      Number(attrs.fontSize?.slice(0, -2))
    );
    let numUniqueCurrentFontSizes = new Set(currentFontSizes).size;
    if (!editor.isActive('textStyle')) {
      numUniqueCurrentFontSizes += 1;
    }
    if (numUniqueCurrentFontSizes === 1) {
      currentFontSize = editorState.textStyle.fontSize?.slice(0, -2) || '기본값';
    } else {
      currentFontSize = `${Math.min(...currentFontSizes)}+`;
    }
  }
  return currentFontSize;
}

// Helper to clamp values between a range
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

// Convert Hex to RGB
export function hexToRgba(hex: string): RGB {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i);
  if (!match) throw new Error('Invalid hex color');

  const [, r, g, b] = match;
  return {
    r: parseInt(r, 16),
    g: parseInt(g, 16),
    b: parseInt(b, 16),
  };
}

// Convert RGB to Hex
export function rgbToHex({r, g, b}: RGB): string {
  return `#${[r, g, b].map((v) => clamp(v, 0, 255).toString(16).padStart(2, '0')).join('')}`;
}

// Convert RGB to HSL
export function rgbToHsl({r, g, b}: RGB): HSL {
  const rNorm = r / 255,
    gNorm = g / 255,
    bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm),
    min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;
  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  const h =
    delta === 0
      ? 0
      : max === rNorm
        ? ((gNorm - bNorm) / delta) % 6
        : max === gNorm
          ? (bNorm - rNorm) / delta + 2
          : (rNorm - gNorm) / delta + 4;
  return {h: Math.round(h * 60 + 360) % 360, s: +(s * 100).toFixed(1), l: +(l * 100).toFixed(1)};
}

// Convert HSL to RGB
export function hslToRgba({h, s, l}: HSL): RGB {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  const [r, g, b] =
    h < 60
      ? [c, x, 0]
      : h < 120
        ? [x, c, 0]
        : h < 180
          ? [0, c, x]
          : h < 240
            ? [0, x, c]
            : h < 300
              ? [x, 0, c]
              : [c, 0, x];

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

// Convert HSL to Hex
export function hslToHex(hsl: HSL): string {
  return rgbToHex(hslToRgba(hsl));
}

// Convert Hex to HSL
export function hexToHsl(hex: string): HSL {
  return rgbToHsl(hexToRgba(hex));
}

// Convert RGB object to "rgb(r, g, b, a)" string
export function rgbToCssString({r, g, b}: RGB): string {
  return `rgb(${clamp(r, 0, 255)}, ${clamp(g, 0, 255)}, ${clamp(b, 0, 255)})`;
}

// Convert HSL object to "hsl(h, s%, l%, a)" string
export function hslToCssString({h, s, l}: HSL): string {
  return `hsl(${clamp(h, 0, 360)}, ${clamp(s, 0, 100)}%, ${clamp(l, 0, 100)}%)`;
}

// Convert "rgb(r, g, b, a)" string back to RGB object
export function cssStringToRgba(cssString: string): RGB {
  const match = cssString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match) throw new Error('Invalid RGB CSS string');
  const [, r, g, b] = match;
  return {
    r: parseInt(r, 10),
    g: parseInt(g, 10),
    b: parseInt(b, 10),
  };
}

// Convert "hsl(h, s%, l%, a)" string back to HSL object
export function cssStringToHsl(cssString: string): HSL {
  const match = cssString.match(/^hsl\((\d+),\s*(\d+(?:\.\d+)?)%?,\s*(\d+(?:\.\d+)?)%?\)$/);
  if (!match) throw new Error('Invalid HSL CSS string');
  const [, h, s, l] = match;
  return {
    h: parseInt(h, 10),
    s: parseInt(s, 10),
    l: parseInt(l, 10),
  };
}

export function parseColorString(color: string): ColorPickerState {
  if (color.includes('var')) {
    return {
      mode: 'NAMED',
      color,
    };
  } else if (color.includes('rgb')) {
    return {
      mode: 'RGB',
      rgb: cssStringToRgba(color),
    };
  } else if (color.includes('hsl')) {
    return {
      mode: 'HSL',
      hsl: cssStringToHsl(color),
    };
  } else {
    return {
      mode: 'HEX',
      hex: color,
    };
  }
}

export function getColorString(colorPickerState: ColorPickerState): string {
  if (colorPickerState.mode === 'NAMED') {
    return colorPickerState.color;
  } else if (colorPickerState.mode === 'HEX') {
    return colorPickerState.hex;
  } else if (colorPickerState.mode === 'RGB') {
    return rgbToCssString(colorPickerState.rgb);
  } else {
    return hslToCssString(colorPickerState.hsl);
  }
}

export const YOUTUBE_REGEX =
  /^(https?:\/\/)?(www\.|music\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(?!channel\/)(?!@)(.+)?$/;
export const YOUTUBE_REGEX_GLOBAL =
  /^(https?:\/\/)?(www\.|music\.)?(youtube\.com|youtu\.be)\/(?!channel\/)(?!@)(.+)?$/g;

export const isValidYoutubeUrl = (url: string) => {
  return url.match(YOUTUBE_REGEX);
};

export interface GetEmbedUrlOptions {
  url: string;
  allowFullscreen?: boolean;
  autoplay?: boolean;
  ccLanguage?: string;
  ccLoadPolicy?: boolean;
  controls?: boolean;
  disableKBcontrols?: boolean;
  enableIFrameApi?: boolean;
  endTime?: number;
  interfaceLanguage?: string;
  ivLoadPolicy?: number;
  loop?: boolean;
  modestBranding?: boolean;
  nocookie?: boolean;
  origin?: string;
  playlist?: string;
  progressBarColor?: string;
  startAt?: number;
}

export const getYoutubeEmbedUrl = (nocookie?: boolean) => {
  return nocookie ? 'https://www.youtube-nocookie.com/embed/' : 'https://www.youtube.com/embed/';
};

export const getEmbedUrlFromYoutubeUrl = (options: GetEmbedUrlOptions) => {
  const {
    url,
    allowFullscreen,
    autoplay,
    ccLanguage,
    ccLoadPolicy,
    controls,
    disableKBcontrols,
    enableIFrameApi,
    endTime,
    interfaceLanguage,
    ivLoadPolicy,
    loop,
    modestBranding,
    nocookie,
    origin,
    playlist,
    progressBarColor,
    startAt,
  } = options;

  if (!isValidYoutubeUrl(url)) {
    return null;
  }

  // if is already an embed url, return it
  if (url.includes('/embed/')) {
    return url;
  }

  // if is a youtu.be url, get the id after the /
  if (url.includes('youtu.be')) {
    const id = url.split('/').pop();

    if (!id) {
      return null;
    }
    return `${getYoutubeEmbedUrl(nocookie)}${id}`;
  }

  const videoIdRegex = /(?:v=|shorts\/)([-\w]+)/gm;
  const matches = videoIdRegex.exec(url);

  if (!matches || !matches[1]) {
    return null;
  }

  let outputUrl = `${getYoutubeEmbedUrl(nocookie)}${matches[1]}`;

  const params = [];

  if (allowFullscreen === false) {
    params.push('fs=0');
  }

  if (autoplay) {
    params.push('autoplay=1');
  }

  if (ccLanguage) {
    params.push(`cc_lang_pref=${ccLanguage}`);
  }

  if (ccLoadPolicy) {
    params.push('cc_load_policy=1');
  }

  if (!controls) {
    params.push('controls=0');
  }

  if (disableKBcontrols) {
    params.push('disablekb=1');
  }

  if (enableIFrameApi) {
    params.push('enablejsapi=1');
  }

  if (endTime) {
    params.push(`end=${endTime}`);
  }

  if (interfaceLanguage) {
    params.push(`hl=${interfaceLanguage}`);
  }

  if (ivLoadPolicy) {
    params.push(`iv_load_policy=${ivLoadPolicy}`);
  }

  if (loop) {
    params.push('loop=1');
  }

  if (modestBranding) {
    params.push('modestbranding=1');
  }

  if (origin) {
    params.push(`origin=${origin}`);
  }

  if (playlist) {
    params.push(`playlist=${playlist}`);
  }

  if (startAt) {
    params.push(`start=${startAt}`);
  }

  if (progressBarColor) {
    params.push(`color=${progressBarColor}`);
  }

  if (params.length) {
    outputUrl += `?${params.join('&')}`;
  }

  return outputUrl;
};

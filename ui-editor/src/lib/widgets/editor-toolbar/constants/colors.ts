import {ColorPalette} from '../../../shared/types';

export const COLORS: ColorPalette[] = [
  {
    label: 'Palette 1',
    inverse: 'hsl(var(--background))',
    colors: [
      {cssVar: 'hsl(var(--foreground))', label: '기본 색상', rgb: {r: 15, g: 23, b: 42}},
      {
        cssVar: 'var(--mt-accent-bold-blue)',
        label: '짙은 파랑',
        rgb: {r: 0, g: 85, b: 204},
      },
      {
        cssVar: 'var(--mt-accent-bold-teal)',
        label: '짙은 청록',
        rgb: {r: 32, g: 106, b: 131},
      },
      {
        cssVar: 'var(--mt-accent-bold-green)',
        label: '짙은 초록',
        rgb: {r: 33, g: 110, b: 78},
      },
      {
        cssVar: 'var(--mt-accent-bold-orange)',
        label: '짙은 주황',
        rgb: {r: 165, g: 72, b: 0},
      },
      {
        cssVar: 'var(--mt-accent-bold-red)',
        label: '짙은 빨강',
        rgb: {r: 174, g: 46, b: 36},
      },
      {
        cssVar: 'var(--mt-accent-bold-purple)',
        label: '짙은 보라',
        rgb: {r: 94, g: 77, b: 178},
      },
    ],
  },
  {
    label: 'Palette 2',
    inverse: 'hsl(var(--background))',
    colors: [
      {cssVar: 'var(--mt-accent-gray)', label: '회색', rgb: {r: 117, g: 129, b: 149}},
      {cssVar: 'var(--mt-accent-blue)', label: '파랑', rgb: {r: 29, g: 122, b: 252}},
      {cssVar: 'var(--mt-accent-teal)', label: '청록', rgb: {r: 40, g: 152, b: 189}},
      {cssVar: 'var(--mt-accent-green)', label: '초록', rgb: {r: 4, g: 160, b: 107}},
      {cssVar: 'var(--mt-accent-orange)', label: '주황', rgb: {r: 254, g: 163, b: 98}},
      {cssVar: 'var(--mt-accent-red)', label: '빨강', rgb: {r: 201, g: 55, b: 44}},
      {cssVar: 'var(--mt-accent-purple)', label: '보라', rgb: {r: 130, g: 112, b: 219}},
    ],
  },
  {
    label: 'Palette 3',
    inverse: 'hsl(var(--foreground))',
    colors: [
      {
        cssVar: 'hsl(var(--background))',
        label: '백색',
        darkLabel: '흑색',
        rgb: {r: 255, g: 255, b: 255},
      },
      {
        cssVar: 'var(--mt-accent-blue-subtler)',
        label: '밝은 파랑',
        rgb: {r: 204, g: 224, b: 255},
      },
      {
        cssVar: 'var(--mt-accent-teal-subtler)',
        label: '밝은 청록',
        rgb: {r: 198, g: 237, b: 251},
      },
      {
        cssVar: 'var(--mt-accent-green-subtler)',
        label: '밝은 초록',
        rgb: {r: 186, g: 243, b: 219},
      },
      {
        cssVar: 'var(--mt-accent-yellow-subtler)',
        label: '밝은 노랑',
        rgb: {r: 248, g: 230, b: 160},
      },
      {
        cssVar: 'var(--mt-accent-red-subtler)',
        label: '밝은 빨강',
        rgb: {r: 255, g: 213, b: 210},
      },
      {
        cssVar: 'var(--mt-accent-purple-subtler)',
        label: '밝은 보라',
        rgb: {r: 223, g: 216, b: 253},
      },
    ],
  },
];

export type AlignType = 'left' | 'center' | 'right';
export type JustifyType = 'start' | 'center' | 'end';

export type NodeAttributes = {
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
  align: AlignType;
};
